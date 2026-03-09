import { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Building2, Calendar, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSubmissionDetail() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [match, params] = useRoute('/admin/submission/:id');
  const submissionId = params?.id ? parseInt(params.id) : null;

  // Redirect non-admins
  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  const [newNoteType, setNewNoteType] = useState<'email' | 'call' | 'meeting' | 'note'>('note');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const { data: submission, isLoading } = trpc.admin.getSubmission.useQuery(
    { id: submissionId! },
    { enabled: !!submissionId }
  );

  const { data: communicationHistory = [] } = trpc.admin.getCommunicationHistory.useQuery(
    { submissionId: submissionId! },
    { enabled: !!submissionId }
  );

  const updateStatusMutation = trpc.admin.updateStatus.useMutation({
    onSuccess: () => {
      toast.success('Status updated');
      setSelectedStatus('');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update status');
    },
  });

  const addNoteMutation = trpc.admin.addNote.useMutation({
    onSuccess: () => {
      toast.success('Note added');
      setNewNoteContent('');
      setNewNoteType('note');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add note');
    },
  });

  const handleStatusChange = (newStatus: string) => {
    if (!submissionId) return;
    updateStatusMutation.mutate({
      id: submissionId,
      status: newStatus as any,
      notes: selectedStatus,
    });
  };

  const handleAddNote = () => {
    if (!submissionId || !newNoteContent.trim()) return;
    addNoteMutation.mutate({
      submissionId,
      type: newNoteType,
      content: newNoteContent,
    });
  };

  if (!match || !submissionId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F1E9] flex items-center justify-center">
        <p className="text-[#0A1128]">Loading...</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-[#F8F1E9]">
        <header className="bg-[#0A1128] text-[#F8F1E9] py-6 border-b-2 border-[#D4AF37]">
          <div className="container max-w-7xl">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-[#D4AF37] hover:text-[#F8F1E9] transition mb-4"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold">Submission Not Found</h1>
          </div>
        </header>
      </div>
    );
  }

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-purple-100 text-purple-800',
    negotiating: 'bg-orange-100 text-orange-800',
    converted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const inquiryTypeLabels = {
    investor: 'Investor Inquiry',
    partnership: 'Partnership Request',
    media: 'Media Inquiry',
  };

  const communicationTypeIcons = {
    email: Mail,
    call: Phone,
    meeting: Building2,
    note: MessageSquare,
  };

  return (
    <div className="min-h-screen bg-[#F8F1E9]">
      {/* Header */}
      <header className="bg-[#0A1128] text-[#F8F1E9] py-6 border-b-2 border-[#D4AF37]">
        <div className="container max-w-7xl">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-[#D4AF37] hover:text-[#F8F1E9] transition mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold mb-2">{submission.name}</h1>
          <p className="opacity-80">{inquiryTypeLabels[submission.inquiryType as keyof typeof inquiryTypeLabels]}</p>
        </div>
      </header>

      <main className="container max-w-7xl py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Submission Details */}
          <div className="md:col-span-2">
            {/* Contact Information */}
            <div className="bg-white border-2 border-[#E8E0D5] rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#0A1128] mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#0A1128] opacity-70 mb-1">Email</p>
                  <p className="text-lg text-[#0A1128] font-semibold flex items-center gap-2">
                    <Mail size={18} className="text-[#D4AF37]" />
                    <a href={`mailto:${submission.email}`} className="hover:text-[#D4AF37]">
                      {submission.email}
                    </a>
                  </p>
                </div>
                {submission.phone && (
                  <div>
                    <p className="text-sm text-[#0A1128] opacity-70 mb-1">Phone</p>
                    <p className="text-lg text-[#0A1128] font-semibold flex items-center gap-2">
                      <Phone size={18} className="text-[#D4AF37]" />
                      <a href={`tel:${submission.phone}`} className="hover:text-[#D4AF37]">
                        {submission.phone}
                      </a>
                    </p>
                  </div>
                )}
                {submission.company && (
                  <div>
                    <p className="text-sm text-[#0A1128] opacity-70 mb-1">Company</p>
                    <p className="text-lg text-[#0A1128] font-semibold flex items-center gap-2">
                      <Building2 size={18} className="text-[#D4AF37]" />
                      {submission.company}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-[#0A1128] opacity-70 mb-1">Submitted</p>
                  <p className="text-lg text-[#0A1128] font-semibold flex items-center gap-2">
                    <Calendar size={18} className="text-[#D4AF37]" />
                    {new Date(submission.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-white border-2 border-[#E8E0D5] rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#0A1128] mb-4">Message</h2>
              <p className="text-[#0A1128] leading-relaxed whitespace-pre-wrap">{submission.message}</p>
            </div>

            {/* Communication History */}
            <div className="bg-white border-2 border-[#E8E0D5] rounded-lg p-6">
              <h2 className="text-2xl font-bold text-[#0A1128] mb-6">Communication History</h2>
              {communicationHistory.length === 0 ? (
                <p className="text-[#0A1128] opacity-70">No communication history yet.</p>
              ) : (
                <div className="space-y-4">
                  {communicationHistory.map((log) => {
                    const IconComponent = communicationTypeIcons[log.type as keyof typeof communicationTypeIcons];
                    return (
                      <div
                        key={log.id}
                        className="border-l-4 border-[#D4AF37] pl-4 py-2"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent size={16} className="text-[#D4AF37]" />
                          <span className="font-semibold text-[#0A1128] capitalize">
                            {log.type}
                          </span>
                          <span className="text-sm text-[#0A1128] opacity-70">
                            {new Date(log.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[#0A1128] whitespace-pre-wrap">{log.content}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Status & Actions */}
          <div>
            {/* Status Section */}
            <div className="bg-white border-2 border-[#E8E0D5] rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-[#0A1128] mb-4">Status</h2>
              <div className="mb-6">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    statusColors[submission.status as keyof typeof statusColors]
                  }`}
                >
                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2">
                {['new', 'contacted', 'qualified', 'negotiating', 'converted', 'rejected'].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={updateStatusMutation.isPending}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition ${
                        submission.status === status
                          ? 'bg-[#D4AF37] text-[#0A1128]'
                          : 'bg-[#F8F1E9] text-[#0A1128] hover:bg-[#E8E0D5]'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Admin Notes */}
            {submission.adminNotes && (
              <div className="bg-[#FFF9F0] border-2 border-[#D4AF37] rounded-lg p-6 mb-8">
                <h3 className="font-bold text-[#0A1128] mb-3">Admin Notes</h3>
                <p className="text-[#0A1128] text-sm whitespace-pre-wrap">{submission.adminNotes}</p>
              </div>
            )}

            {/* Last Contacted */}
            {submission.lastContactedAt && (
              <div className="bg-white border-2 border-[#E8E0D5] rounded-lg p-6 mb-8">
                <p className="text-sm text-[#0A1128] opacity-70 mb-2">Last Contacted</p>
                <p className="text-[#0A1128] font-semibold">
                  {new Date(submission.lastContactedAt).toLocaleString()}
                </p>
              </div>
            )}

            {/* Add Communication Log */}
            <div className="bg-white border-2 border-[#E8E0D5] rounded-lg p-6">
              <h3 className="font-bold text-[#0A1128] mb-4">Add Communication</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1128] mb-2">Type</label>
                  <select
                    value={newNoteType}
                    onChange={(e) => setNewNoteType(e.target.value as any)}
                    className="w-full px-3 py-2 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128]"
                  >
                    <option value="email">Email</option>
                    <option value="call">Call</option>
                    <option value="meeting">Meeting</option>
                    <option value="note">Note</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A1128] mb-2">Content</label>
                  <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Add details about this communication..."
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128] resize-none"
                  />
                </div>
                <Button
                  onClick={handleAddNote}
                  disabled={addNoteMutation.isPending || !newNoteContent.trim()}
                  className="w-full bg-[#0A1128] text-[#F8F1E9] hover:bg-[#D4AF37] hover:text-[#0A1128] flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {addNoteMutation.isPending ? 'Adding...' : 'Add Communication'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
