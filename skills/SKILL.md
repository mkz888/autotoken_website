---
name: admin-panel-builder
description: Build admin panels with lead management and communication tracking. Use for creating dashboards to manage contact form submissions, track lead status, and maintain communication history with prospects.
---

# Admin Panel Builder

## Overview

This skill enables rapid development of admin panels for managing leads and tracking communication. It provides a complete workflow for building:

- **Admin Dashboard**: Overview of all submissions with filtering, stats, and quick access
- **Submission Detail Pages**: Deep dive into individual leads with communication history
- **Lead Status Tracking**: Workflow from new → contacted → qualified → negotiating → converted/rejected
- **Communication Audit Trail**: Complete record of all interactions (emails, calls, meetings, notes)

The skill includes database schemas, backend API templates, and reference guides for building production-ready admin systems.

## When to Use This Skill

Use this skill when you need to:
- Build an admin panel to manage contact form submissions
- Track lead status through a sales/partnership pipeline
- Maintain audit trail of all communication with prospects
- Filter and search leads by status, type, or other criteria
- Add notes and log interactions with leads

## Core Workflow

### Phase 1: Database Setup
1. Copy schema from `templates/drizzle_schema_template.ts`
2. Customize field names and inquiry types for your use case
3. Run `pnpm db:push` to create tables

### Phase 2: Backend Implementation
1. Add database helpers from `templates/db_helpers_template.ts` to `server/db.ts`
2. Create admin router from `templates/admin_router_template.ts`
3. Register router in `server/routers.ts`
4. Test endpoints with tRPC devtools

### Phase 3: Frontend Implementation
1. Create admin dashboard page with submissions table and filtering
2. Create submission detail page with communication history
3. Add routes to `App.tsx`
4. Integrate with existing contact form

### Phase 4: Testing & Refinement
1. Test dashboard filtering and navigation
2. Test status updates and communication logging
3. Verify role-based access control
4. Customize status values or add fields as needed

## Database Schema

### contactSubmissions Table
Stores all form submissions with lead information and status tracking.

**Key Fields:**
- `id`: Primary key
- `name`, `email`, `phone`, `company`: Contact information
- `inquiryType`: Categorizes submission (e.g., investor, partnership, media)
- `message`: Full message content
- `status`: Lead status (new → contacted → qualified → negotiating → converted/rejected)
- `adminNotes`: Internal notes for team
- `lastContactedAt`: Timestamp of last interaction
- `createdAt`, `updatedAt`: Audit timestamps

### communicationLog Table
Audit trail of all interactions with leads.

**Key Fields:**
- `id`: Primary key
- `submissionId`: Foreign key to contactSubmissions
- `type`: Communication method (email, call, meeting, note)
- `content`: Details of interaction
- `createdAt`: Timestamp

## API Endpoints

All endpoints require admin role and are protected with `protectedProcedure`.

### Queries

**admin.submissions**
- Returns all submissions ordered by newest first
- Frontend filters by status, inquiry type, search term

**admin.getSubmission**
- Input: `{ id: number }`
- Returns full submission details

**admin.getCommunicationHistory**
- Input: `{ submissionId: number }`
- Returns communication logs ordered by newest first

### Mutations

**admin.updateStatus**
- Input: `{ id: number, status: enum, notes?: string }`
- Updates lead status and optional admin notes
- Sets `lastContactedAt` timestamp

**admin.addNote**
- Input: `{ submissionId: number, type: enum, content: string }`
- Adds communication log entry
- Types: email, call, meeting, note

## Implementation Example

### 1. Database Setup
```bash
# Copy schema template
cp templates/drizzle_schema_template.ts drizzle/schema.ts

# Run migration
pnpm db:push
```

### 2. Backend Setup
```typescript
// server/db.ts - add helpers from template
import { getAllSubmissions, getSubmissionById, ... } from "./db";

// server/routers/admin.ts - create from template
export const adminRouter = router({
  submissions: protectedProcedure.query(...),
  getSubmission: protectedProcedure.input(...).query(...),
  updateStatus: protectedProcedure.input(...).mutation(...),
  addNote: protectedProcedure.input(...).mutation(...),
  getCommunicationHistory: protectedProcedure.input(...).query(...),
});

// server/routers.ts - register router
export const appRouter = router({
  admin: adminRouter,
  // ... other routers
});
```

### 3. Frontend Setup
```typescript
// client/src/pages/AdminDashboard.tsx
const { data: submissions } = trpc.admin.submissions.useQuery();
// Implement filtering, stats, table rendering

// client/src/pages/AdminSubmissionDetail.tsx
const { data: submission } = trpc.admin.getSubmission.useQuery({ id });
const { data: history } = trpc.admin.getCommunicationHistory.useQuery({ submissionId: id });
// Implement detail display, status updates, communication logging

// client/src/App.tsx - add routes
<Route path={"/admin"} component={AdminDashboard} />
<Route path={"/admin/submission/:id"} component={AdminSubmissionDetail} />
```

## Customization Points

### Extend Inquiry Types
Modify the `inquiryType` enum in schema to match your use case:
```typescript
inquiryType: mysqlEnum("inquiry_type", ["investor", "partnership", "media", "press", "other"])
```

### Customize Status Workflow
Extend status values for different pipelines:
```typescript
status: mysqlEnum("status", ["new", "contacted", "qualified", "demo", "proposal", "negotiating", "converted", "rejected"])
```

### Add Custom Fields
Add columns to `contactSubmissions` for tracking additional information:
```typescript
industry: varchar("industry", { length: 255 }),
investmentAmount: int("investment_amount"),
priority: mysqlEnum("priority", ["low", "medium", "high"]),
```

### Add Email Notifications
In `admin.updateStatus` mutation, send emails when status changes:
```typescript
if (input.status === "qualified") {
  await sendEmail(submission.email, "We're interested in discussing...");
}
```

### Add Lead Scoring
Track engagement metrics:
```typescript
engagementScore: int("engagement_score").default(0),
// Increment on each communication in addNote mutation
```

## References

For detailed implementation guidance, see:
- **architecture.md**: System design and data flow
- **implementation_workflow.md**: Step-by-step implementation with troubleshooting

## Templates

Bundled templates provide ready-to-use code:
- **drizzle_schema_template.ts**: Database schema
- **db_helpers_template.ts**: Database query functions
- **admin_router_template.ts**: tRPC admin endpoints

Copy and customize these templates for your project.

## Security Considerations

- All admin endpoints check `ctx.user.role === "admin"`
- Non-admins are redirected from `/admin` routes
- Communication logs are immutable (no delete/edit)
- All mutations update `lastContactedAt` timestamp for audit trail
- Admin notes are only visible to admins

## Common Patterns

### Filter Submissions on Frontend
```typescript
const filtered = submissions.filter(s => {
  const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
  const matchesType = typeFilter === 'all' || s.inquiryType === typeFilter;
  const matchesSearch = s.name.includes(searchTerm) || s.email.includes(searchTerm);
  return matchesStatus && matchesType && matchesSearch;
});
```

### Display Status Badge
```typescript
const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-purple-100 text-purple-800',
  converted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};
```

### Update Status with Mutation
```typescript
const updateMutation = trpc.admin.updateStatus.useMutation({
  onSuccess: () => {
    toast.success('Status updated');
    // Invalidate queries to refresh UI
  },
});

updateMutation.mutate({
  id: submissionId,
  status: "qualified",
  notes: "Met all criteria, ready for demo",
});
```

### Add Communication Log
```typescript
const addNoteMutation = trpc.admin.addNote.useMutation({
  onSuccess: () => {
    toast.success('Communication logged');
  },
});

addNoteMutation.mutate({
  submissionId,
  type: "call",
  content: "Discussed partnership opportunities, interested in pilot",
});
```

## Troubleshooting

**Submissions not appearing**: Verify database migration ran, check that submissions are being saved, verify admin user has correct role.

**Status update not working**: Check user is logged in with admin role, verify submission ID is correct, check server logs for errors.

**Communication history empty**: Verify communication logs are being saved, check submissionId matches, verify timestamps are correct.

For more detailed troubleshooting, see **implementation_workflow.md**.
