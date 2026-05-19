import { BlogPost, BlogPostInput } from '../types/blog';
import { getDb } from './db';

interface DbBlogRow {
  id: string;
  slug: string;
  cover_image: string | null;
  tags: string[];
  author: string | null;
  date: string | null;
  read_time: string | null;
  published: boolean;
  content: Record<string, { title: string; excerpt: string; content: string }>;
  created_at: string;
  updated_at: string;
}

function rowToPost(row: DbBlogRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    coverImage: row.cover_image || '',
    tags: row.tags || [],
    author: row.author || '',
    date: row.date || '',
    readTime: row.read_time || '',
    published: row.published,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  const sql = getDb();
  if (!sql) return [];

  try {
    const rows = await sql`
      SELECT id, slug, cover_image, tags, author, date, read_time, published, content, created_at, updated_at
      FROM blog_posts
      ORDER BY created_at DESC
    ` as unknown as DbBlogRow[];

    return rows.map(rowToPost);
  } catch (error) {
    console.error('Failed to fetch posts from database:', error);
    return [];
  }
}

export async function getPost(id: string): Promise<BlogPost | null> {
  const sql = getDb();
  if (!sql) return null;

  try {
    const rows = await sql`
      SELECT id, slug, cover_image, tags, author, date, read_time, published, content, created_at, updated_at
      FROM blog_posts
      WHERE id = ${id}
    ` as unknown as DbBlogRow[];

    if (rows.length === 0) return null;
    return rowToPost(rows[0]);
  } catch (error) {
    console.error('Failed to fetch post from database:', error);
    return null;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const sql = getDb();
  if (!sql) return null;

  try {
    const rows = await sql`SELECT * FROM blog_posts WHERE LOWER(slug) = LOWER(${slug})` as unknown as DbBlogRow[];

    if (rows.length === 0) return null;
    return rowToPost(rows[0]);
  } catch (error) {
    console.error('Failed to fetch post by slug from database:', error);
    return null;
  }
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  const sql = getDb();
  if (!sql) throw new Error('Database not available');

  const now = new Date().toISOString();
  const id = `BP-${Date.now()}`;

  await sql`
    INSERT INTO blog_posts (id, slug, cover_image, tags, author, date, read_time, published, content, created_at, updated_at)
    VALUES (
      ${id},
      ${input.slug},
      ${input.coverImage || ''},
      ${JSON.stringify(input.tags)}::jsonb,
      ${input.author || ''},
      ${input.date || ''},
      ${input.readTime || ''},
      ${input.published},
      ${JSON.stringify(input.content)}::jsonb,
      ${now},
      ${now}
    )
  `;

  return {
    ...input,
    id,
    createdAt: now,
    updatedAt: now,
  };
}

export async function updatePost(id: string, input: Partial<BlogPostInput>): Promise<BlogPost | null> {
  const sql = getDb();
  if (!sql) return null;

  try {
    const now = new Date().toISOString();

    const result = await sql`
      UPDATE blog_posts SET
        slug = COALESCE(${input.slug ?? null}, slug),
        cover_image = COALESCE(${input.coverImage ?? null}, cover_image),
        tags = COALESCE(${input.tags ? JSON.stringify(input.tags) : null}::jsonb, tags),
        author = COALESCE(${input.author ?? null}, author),
        date = COALESCE(${input.date ?? null}, date),
        read_time = COALESCE(${input.readTime ?? null}, read_time),
        published = COALESCE(${input.published ?? null}, published),
        content = COALESCE(${input.content ? JSON.stringify(input.content) : null}::jsonb, content),
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    ` as unknown as DbBlogRow[];

    if (result.length === 0) return null;
    return rowToPost(result[0]);
  } catch (error) {
    console.error('Failed to update post in database:', error);
    return null;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;

  try {
    const result = await sql`DELETE FROM blog_posts WHERE id = ${id} RETURNING id`;
    return result.length > 0;
  } catch (error) {
    console.error('Failed to delete post from database:', error);
    return false;
  }
}
