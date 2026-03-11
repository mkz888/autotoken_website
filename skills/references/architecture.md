# Admin Panel Architecture Guide

## Overview

This guide explains the architecture for building admin panels with lead management and communication tracking. The system consists of three layers:

1. **Database Layer**: Schema for submissions and communication logs
2. **API Layer**: tRPC procedures for admin operations
3. **UI Layer**: React components for dashboard and detail pages

## Database Layer

### Tables

**contactSubmissions** - Stores all form submissions
- `id`: Primary key
- `name`, `email`, `phone`, `company`: Contact information
- `inquiryType`: Categorizes submission type (investor, partnership, media, etc.)
- `message`: Full message content
- `status`: Lead status (new → contacted → qualified → negotiating → converted/rejected)
- `adminNotes`: Internal notes for team
- `lastContactedAt`: Timestamp of last interaction
- `createdAt`, `updatedAt`: Audit timestamps

**communicationLog** - Audit trail of all interactions
- `id`: Primary key
- `submissionId`: Foreign key to contactSubmissions
- `type`: Communication method (email, call, meeting, note)
- `content`: Details of interaction
- `createdAt`: Timestamp

### Status Workflow

```
new → contacted → qualified → negotiating → converted
                                          ↓
                                       rejected
```

- **new**: Initial submission received
- **contacted**: Admin has reached out to lead
- **qualified**: Lead shows genuine interest and meets criteria
- **negotiating**: Active discussions ongoing
- **converted**: Deal closed or committed
- **rejected**: Lead not viable

## API Layer

All admin endpoints require `protectedProcedure` with `ctx.user.role === "admin"`.

### Core Procedures

1. **admin.submissions**: Query all submissions (with filtering on frontend)
2. **admin.getSubmission**: Query single submission by ID
3. **admin.updateStatus**: Mutate submission status and notes
4. **admin.addNote**: Mutate to add communication log entry
5. **admin.getCommunicationHistory**: Query communication logs for submission

## UI Layer

### Admin Dashboard (`/admin`)

**Purpose**: Overview of all leads and quick filtering

**Features**:
- Real-time stats cards (total, new, contacted, qualified, converted)
- Advanced filtering by status, inquiry type, search term
- Sortable submissions table
- Quick access to individual submissions

**Key Components**:
- Stats calculation (count by status)
- Filter state management
- Table rendering with status badges

### Submission Detail (`/admin/submission/:id`)

**Purpose**: Deep dive into single lead with full communication history

**Features**:
- Contact information display
- Original message
- Communication history timeline
- Status management buttons
- Add communication log form
- Admin notes section

**Key Components**:
- Submission fetching by ID
- Communication log timeline
- Status update mutation
- Add note form with validation

## Data Flow

```
User Action (Dashboard)
    ↓
Filter/Search State Update
    ↓
Query admin.submissions
    ↓
Display Filtered Results
    ↓
User Clicks "View"
    ↓
Navigate to /admin/submission/:id
    ↓
Query admin.getSubmission + getCommunicationHistory
    ↓
Display Details + Timeline
    ↓
User Updates Status or Adds Note
    ↓
Mutate admin.updateStatus or admin.addNote
    ↓
Invalidate queries
    ↓
UI Updates
```

## Security Considerations

- All admin endpoints check `ctx.user.role === "admin"`
- Non-admins are redirected to home page
- Communication logs are immutable (no delete/edit)
- Admin notes are only visible to admins
- All mutations update `lastContactedAt` timestamp

## Customization Points

1. **Inquiry Types**: Modify enum in schema (investor, partnership, media, etc.)
2. **Status Values**: Extend status enum for custom workflows
3. **Communication Types**: Add new types (SMS, video call, etc.)
4. **Custom Fields**: Add fields to contactSubmissions table as needed
5. **Filtering Logic**: Extend frontend filtering in dashboard
6. **Notifications**: Add email alerts when status changes
