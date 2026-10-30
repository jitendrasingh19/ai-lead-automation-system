# Database Setup

## Running Database Migrations

The `deals` table has been added to support the sales pipeline feature. You'll need to initialize the database with the provided SQL script.

### Upgrading an existing database

If the `leads` table already exists, running `init-db.sql` does not add newly introduced columns. Apply `migrations/001_add_quote_lead_columns.sql` to the same database used by `DATABASE_URL` before submitting quotes. For example, with `psql`:

```bash
psql -U postgres -h localhost -d ai_lead_db -f migrations/001_add_quote_lead_columns.sql
```

For Neon, paste the contents of that migration into the SQL Editor and execute it. The migration is safe to re-run.

### Option 1: Using psql (PostgreSQL CLI)

If you have PostgreSQL installed locally:

```bash
psql -U postgres -h localhost -d ai_lead_db -f init-db.sql
```

### Option 2: Using Neon (Cloud PostgreSQL)

If you're using Neon (recommended for production):

1. Go to your Neon project dashboard: https://console.neon.tech
2. Click on "SQL Editor"
3. Copy the contents of `init-db.sql`
4. Paste it into the SQL Editor
5. Click "Execute"

### Option 3: Using Docker

If you're running PostgreSQL in Docker:

```bash
# Copy the init script into the container
docker cp init-db.sql ai_lead_postgres:/tmp/

# Execute the script
docker exec -it ai_lead_postgres psql -U postgres -d ai_lead_db -f /tmp/init-db.sql
```

## Tables Created

### `leads` Table
Stores lead/contact information with status tracking and scoring.

Fields:
- `id`: UUID primary key
- `email`: Contact email (unique)
- `name/first_name/last_name`: Contact names
- `phone`, `company_name`, `job_title`: Contact details
- `budget_range`, `timeline`, `requirements`: Sales information
- `status`: Lead status (New, Contacted, Meeting, Qualified, Won, Lost)
- `score`: Lead score (0-100)
- `created_at`, `updated_at`: Timestamps

### `deals` Table
Stores deal/opportunity information linked to leads.

Fields:
- `id`: UUID primary key
- `title`: Deal title/name
- `value`: Deal monetary value
- `stage`: Deal stage (new, contacted, negotiation, won, lost)
- `customer_id`: Reference to leads table
- `created_at`, `updated_at`: Timestamps

## Database Indexes

The script automatically creates indexes for optimal query performance:
- `idx_leads_email`: Fast email lookups
- `idx_leads_status`: Fast status filtering
- `idx_deals_stage`: Fast deal stage filtering
- `idx_deals_customer_id`: Fast customer lookups

## Verifying the Setup

After running the migrations, verify the tables were created:

```bash
# Connect to your database
psql -U postgres -h localhost -d ai_lead_db

# Check tables
\dt

# Check table structure
\d leads
\d deals
```

## Next Steps

1. The admin interface for deals is available at `/admin/deals`
2. The API endpoints are:
   - `GET /api/deals` - Fetch all deals (supports ?stage=VALUE filter)
   - `POST /api/deals` - Create new deal
   - `PATCH /api/deals/[id]` - Update deal
   - `DELETE /api/deals/[id]` - Delete deal
3. Start adding deals through the web interface or API

## Troubleshooting

**Issue**: "Deals are not found" or empty list
- Solution: Make sure you've run the `init-db.sql` script
- Check DATABASE_URL in `.env.local` is correct and accessible

**Issue**: Connection errors
- Solution: Verify PostgreSQL is running and credentials are correct
- Check your firewall/network settings if using a remote database

**Issue**: Permission denied errors
- Solution: Ensure your database user has CREATE TABLE permissions
