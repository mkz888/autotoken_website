# Implementation Workflow

Follow these steps in order to build a complete admin panel with lead management.

## Phase 1: Database Setup

### Step 1.1: Update Schema
1. Open `drizzle/schema.ts`
2. Copy tables from `templates/drizzle_schema_template.ts`
3. Customize field names and types based on your form fields
4. Add any additional fields specific to your use case

### Step 1.2: Run Migration
```bash
cd /path/to/project
pnpm db:push
```

### Step 1.3: Verify Tables
Check that both tables are created in your database:
- `contact_submissions`
- `communication_log`

## Phase 2: Backend Implementation

### Step 2.1: Add Database Helpers
1. Open `server/db.ts`
2. Copy functions from `templates/db_helpers_template.ts`
3. Customize table names if you renamed them
4. Ensure imports match your schema file

### Step 2.2: Create Admin Router
1. Create new file: `server/routers/admin.ts`
2. Copy code from `templates/admin_router_template.ts`
3. Update imports to match your project structure
4. Customize status enum values if needed

### Step 2.3: Register Router
1. Open `server/routers.ts`
2. Import the admin router: `import { adminRouter } from "./routers/admin"`
3. Add to appRouter: `admin: adminRouter,`

### Step 2.4: Test Endpoints
Run your dev server and test endpoints using tRPC devtools or curl:
```bash
# List submissions
curl http://localhost:3000/api/trpc/admin.submissions

# Get single submission
curl http://localhost:3000/api/trpc/admin.getSubmission?input={"id":1}
```

## Phase 3: Frontend Implementation

### Step 3.1: Create Admin Dashboard
1. Create `client/src/pages/AdminDashboard.tsx`
2. Use the dashboard component from your project's implementation
3. Key features:
   - Query `trpc.admin.submissions.useQuery()`
   - Implement filtering by status, inquiry type, search
   - Display stats cards (total, new, contacted, qualified, converted)
   - Render submissions table with status badges
   - Add "View" button linking to detail page

### Step 3.2: Create Submission Detail Page
1. Create `client/src/pages/AdminSubmissionDetail.tsx`
2. Use route params to get submission ID
3. Query both submission and communication history
4. Key features:
   - Display contact information
   - Show original message
   - Render communication timeline
   - Status update buttons
   - Add communication log form

### Step 3.3: Add Routes
1. Open `client/src/App.tsx`
2. Import both pages
3. Add routes:
   ```tsx
   <Route path={"/admin"} component={AdminDashboard} />
   <Route path={"/admin/submission/:id"} component={AdminSubmissionDetail} />
   ```

### Step 3.4: Add Navigation
1. Add "Admin" link to main navigation (visible only to admins)
2. Use `useAuth()` hook to check `user?.role === "admin"`
3. Link to `/admin`

## Phase 4: Integration with Contact Form

### Step 4.1: Update Contact Form Submission
Ensure your contact form:
1. Calls `trpc.contact.submit.useMutation()` (or your form endpoint)
2. Saves submission to database
3. Sends notification email to admin

### Step 4.2: Verify Data Flow
1. Submit test form from public contact page
2. Check that submission appears in admin dashboard
3. Verify all fields are captured correctly

## Phase 5: Testing & Refinement

### Step 5.1: Test Dashboard
- [ ] Load dashboard and verify all submissions appear
- [ ] Test filtering by status (new, contacted, qualified, etc.)
- [ ] Test filtering by inquiry type
- [ ] Test search by name/email/company
- [ ] Verify stats cards show correct counts
- [ ] Click "View" button and verify navigation

### Step 5.2: Test Detail Page
- [ ] Load detail page and verify all info displays
- [ ] Test status update buttons
- [ ] Add a communication log entry and verify it appears
- [ ] Test all communication types (email, call, meeting, note)
- [ ] Verify timestamps are correct
- [ ] Test admin notes display

### Step 5.3: Test Role-Based Access
- [ ] Verify non-admin users are redirected from `/admin`
- [ ] Verify admin user can access both pages
- [ ] Test that only admins can update status/add notes

## Phase 6: Customization (Optional)

### Extend Status Workflow
If you need custom statuses:
1. Update status enum in `drizzle/schema.ts`
2. Update status enum in `admin_router_template.ts`
3. Update status colors in dashboard component
4. Run `pnpm db:push`

### Add Custom Fields
To track additional information:
1. Add column to `contactSubmissions` table
2. Update form component to capture field
3. Update dashboard/detail pages to display field
4. Run `pnpm db:push`

### Add Email Notifications
When status changes:
1. In `admin.updateStatus` mutation, call email service
2. Send notification to lead based on new status
3. Log email in communication history

### Add Automated Lead Scoring
Track engagement metrics:
1. Add `engagementScore` column to submissions
2. Increment on each communication
3. Display score in dashboard
4. Filter by score range

## Troubleshooting

### Submissions not appearing in dashboard
- Verify database migration ran successfully
- Check that form submissions are actually being saved
- Verify admin user has `role === "admin"` in database
- Check browser console for tRPC errors

### Status update not working
- Verify user is logged in and has admin role
- Check that submission ID is correct
- Verify database connection is active
- Check server logs for errors

### Communication history not showing
- Verify communication logs are being saved
- Check that submissionId matches submission ID
- Verify timestamps are in correct format
- Check for database constraint violations
