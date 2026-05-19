import { NextRequest, NextResponse } from 'next/server';
import { getDb, isDatabaseAvailable } from '../../../lib/db';
import { BlogPost } from '../../../types/blog';

const DATA_PATH = 'data/blog.json';

async function readPostsFromJson(): Promise<BlogPost[]> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const content = await fs.readFile(path.join(process.cwd(), DATA_PATH), 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  if (!isDatabaseAvailable()) {
    return NextResponse.json(
      { success: false, error: 'Database not configured' },
      { status: 503 }
    );
  }

  const sql = getDb();
  if (!sql) {
    return NextResponse.json(
      { success: false, error: 'Database connection failed' },
      { status: 500 }
    );
  }

  try {
    // Try request body first (works on Vercel), then fall back to filesystem (local dev)
    let posts: BlogPost[] = [];
    try {
      const body = await request.json();
      if (Array.isArray(body) && body.length > 0) {
        posts = body;
      }
    } catch {
      // No JSON body provided
    }

    if (posts.length === 0) {
      posts = await readPostsFromJson();
    }

    if (posts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No posts found. Provide JSON array in request body or ensure data/blog.json exists.' },
        { status: 404 }
      );
    }

    let imported = 0;
    let skipped = 0;

    for (const post of posts) {
      const existing = await sql`SELECT id FROM blog_posts WHERE id = ${post.id}`;

      if (existing.length > 0) {
        skipped++;
        continue;
      }

      const now = new Date().toISOString();
      await sql`
        INSERT INTO blog_posts (id, slug, cover_image, tags, author, date, read_time, published, content, created_at, updated_at)
        VALUES (
          ${post.id},
          ${post.slug},
          ${post.coverImage || ''},
          ${JSON.stringify(post.tags)}::jsonb,
          ${post.author || ''},
          ${post.date || null},
          ${post.readTime || ''},
          ${post.published ?? false},
          ${JSON.stringify(post.content)}::jsonb,
          ${post.createdAt || now},
          ${post.updatedAt || now}
        )
      `;
      imported++;
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${imported} posts, skipped ${skipped} existing`,
      imported,
      skipped,
    });
  } catch (error) {
    console.error('Failed to import posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import posts' },
      { status: 500 }
    );
  }
}