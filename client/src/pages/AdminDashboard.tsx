import { useState, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ChevronRight, Mail, Phone, Building2, Filter } from 'lucide-react';
import { useLocation } from 'wouter';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect non-admins
  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  const { data: submissions = [], isLoading } = trpc.admin.submissions.useQuery();

  // Filter submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
      const matchesType = inquiryTypeFilter === 'all' || submission.inquiryType === inquiryTypeFilter;
      const matchesSearch = 
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.company?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [submissions, statusFilter, inquiryTypeFilter, searchTerm]);

  // Stats
  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    qualified: submissions.filter(s => s.status === 'qualified').length,
    converted: submissions.filter(s => s.status === 'converted').length,
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-purple-100 text-purple-800',
    negotiating: 'bg-orange-100 text-orange-800',
    converted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const inquiryTypeLabels = {
    investor: 'Investor',
    partnership: 'Partnership',
    media: 'Media',
  };

  return (
    <div className="min-h-screen bg-[#F8F1E9]">
      {/* Header */}
      <header className="bg-[#0A1128] text-[#F8F1E9] py-6 border-b-2 border-[#D4AF37]">
        <div className="container max-w-7xl">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="opacity-80">Manage contact submissions and track investor leads</p>
        </div>
      </header>

      <main className="container max-w-7xl py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border-2 border-[#D4AF37] rounded-lg p-6">
            <p className="text-[#0A1128] opacity-70 text-sm font-semibold mb-2">Total Submissions</p>
            <p className="text-4xl font-bold text-[#D4AF37]">{stats.total}</p>
          </div>
          <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
            <p className="text-[#0A1128] opacity-70 text-sm font-semibold mb-2">New</p>
            <p className="text-4xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <div className="bg-white border-2 border-yellow-300 rounded-lg p-6">
            <p className="text-[#0A1128] opacity-70 text-sm font-semibold mb-2">Contacted</p>
            <p className="text-4xl font-bold text-yellow-600">{stats.contacted}</p>
          </div>
          <div className="bg-white border-2 border-purple-300 rounded-lg p-6">
            <p className="text-[#0A1128] opacity-70 text-sm font-semibold mb-2">Qualified</p>
            <p className="text-4xl font-bold text-purple-600">{stats.qualified}</p>
          </div>
          <div className="bg-white border-2 border-green-300 rounded-lg p-6">
            <p className="text-[#0A1128] opacity-70 text-sm font-semibold mb-2">Converted</p>
            <p className="text-4xl font-bold text-green-600">{stats.converted}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-2 border-[#E8E0D5] rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-[#D4AF37]" />
            <h2 className="text-lg font-bold text-[#0A1128]">Filters</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0A1128] mb-2">Search</label>
              <input
                type="text"
                placeholder="Name, email, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1128] mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128]"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="negotiating">Negotiating</option>
                <option value="converted">Converted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1128] mb-2">Inquiry Type</label>
              <select
                value={inquiryTypeFilter}
                onChange={(e) => setInquiryTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128]"
              >
                <option value="all">All Types</option>
                <option value="investor">Investor</option>
                <option value="partnership">Partnership</option>
                <option value="media">Media</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => {
                  setStatusFilter('all');
                  setInquiryTypeFilter('all');
                  setSearchTerm('');
                }}
                variant="outline"
                className="w-full border-[#D4AF37] text-[#0A1128]"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white border-2 border-[#E8E0D5] rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-[#0A1128]">Loading submissions...</div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-8 text-center text-[#0A1128] opacity-70">
              No submissions found matching your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0A1128] text-[#F8F1E9]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-t border-[#E8E0D5] hover:bg-[#F8F1E9] transition"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-[#0A1128]">{submission.name}</p>
                          {submission.company && (
                            <p className="text-sm text-[#0A1128] opacity-70 flex items-center gap-1">
                              <Building2 size={14} />
                              {submission.company}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-[#0A1128] flex items-center gap-2">
                            <Mail size={14} />
                            {submission.email}
                          </p>
                          {submission.phone && (
                            <p className="text-sm text-[#0A1128] opacity-70 flex items-center gap-2">
                              <Phone size={14} />
                              {submission.phone}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-[#0A1128]">
                          {inquiryTypeLabels[submission.inquiryType as keyof typeof inquiryTypeLabels]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColors[submission.status as keyof typeof statusColors]
                          }`}
                        >
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#0A1128] opacity-70">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          onClick={() => navigate(`/admin/submission/${submission.id}`)}
                          variant="outline"
                          className="border-[#D4AF37] text-[#0A1128] hover:bg-[#D4AF37] hover:text-[#0A1128] flex items-center gap-2"
                        >
                          View <ChevronRight size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 text-center text-[#0A1128] opacity-70">
          <p>Showing {filteredSubmissions.length} of {submissions.length} submissions</p>
        </div>
      </main>
    </div>
  );
}
