import { Product, ProductInput, ProductSpec } from '../types/product';
import { getDb } from './db';

interface DbProductRow {
  id: string;
  slug: string;
  image: string | null;
  specs: Record<string, ProductSpec[]>;
  published: boolean;
  content: Record<string, { name: string; description: string }>;
  created_at: string;
  updated_at: string;
}

function rowToProduct(row: DbProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    image: row.image || '',
    specs: row.specs,
    published: row.published,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getProducts(): Promise<Product[]> {
  const sql = getDb();
  if (!sql) return [];

  try {
    const rows = await sql`
      SELECT id, slug, image, specs, published, content, created_at, updated_at
      FROM products
      ORDER BY created_at DESC
    ` as unknown as DbProductRow[];

    return rows.map(rowToProduct);
  } catch (error) {
    console.error('Failed to fetch products from database:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  const sql = getDb();
  if (!sql) return null;

  try {
    const rows = await sql`
      SELECT id, slug, image, specs, published, content, created_at, updated_at
      FROM products
      WHERE id = ${id}
    ` as unknown as DbProductRow[];

    if (rows.length === 0) return null;
    return rowToProduct(rows[0]);
  } catch (error) {
    console.error('Failed to fetch product from database:', error);
    return null;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sql = getDb();
  if (!sql) return null;

  try {
    const rows = await sql`SELECT * FROM products WHERE LOWER(slug) = LOWER(${slug})` as unknown as DbProductRow[];

    if (rows.length === 0) return null;
    return rowToProduct(rows[0]);
  } catch (error) {
    console.error('Failed to get product by slug from database:', error);
    return null;
  }
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const sql = getDb();
  if (!sql) throw new Error('Database not available');

  const now = new Date().toISOString();
  const id = `PA-${Date.now()}`;

  await sql`
    INSERT INTO products (id, slug, image, specs, published, content, created_at, updated_at)
    VALUES (
      ${id},
      ${input.slug},
      ${input.image || ''},
      ${JSON.stringify(input.specs)}::jsonb,
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

export async function updateProduct(id: string, input: Partial<ProductInput>): Promise<Product | null> {
  const sql = getDb();
  if (!sql) return null;

  try {
    const now = new Date().toISOString();

    const result = await sql`
      UPDATE products SET
        slug = COALESCE(${input.slug ?? null}, slug),
        image = COALESCE(${input.image ?? null}, image),
        specs = COALESCE(${input.specs ? JSON.stringify(input.specs) : null}::jsonb, specs),
        published = COALESCE(${input.published ?? null}, published),
        content = COALESCE(${input.content ? JSON.stringify(input.content) : null}::jsonb, content),
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    ` as unknown as DbProductRow[];

    if (result.length === 0) return null;
    return rowToProduct(result[0]);
  } catch (error) {
    console.error('Failed to update product in database:', error);
    return null;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;

  try {
    const result = await sql`DELETE FROM products WHERE id = ${id} RETURNING id`;
    return result.length > 0;
  } catch (error) {
    console.error('Failed to delete product from database:', error);
    return false;
  }
}
