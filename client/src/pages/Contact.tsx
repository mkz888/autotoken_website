import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'investor',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: 'investor', label: 'Investor Inquiry', description: 'Learn about investment opportunities' },
    { value: 'partnership', label: 'Partnership', description: 'Explore business partnerships' },
    { value: 'media', label: 'Media & Press', description: 'Media inquiries and press releases' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you for your inquiry! We will be in touch shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'investor',
        company: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F1E9] pt-32">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#F8F1E9] border-b-2 border-[#D4AF37] z-50">
        <div className="container flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663411014546/3VU2yRwqfwuDCwj6AyQWr5/autotoken_mark_only_d3e9278d.PNG" alt="autotoken.me logo" className="w-16 h-16 object-contain" />
            <h1 className="text-2xl font-bold text-[#0A1128]">autotoken.me</h1>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="/" className="text-[#0A1128] hover:text-[#D4AF37] transition">
              Home
            </a>
            <a href="/#era" className="text-[#0A1128] hover:text-[#D4AF37] transition">
              The Era
            </a>
            <a href="/#concepts" className="text-[#0A1128] hover:text-[#D4AF37] transition">
              Concepts
            </a>
            <a href="/#assets" className="text-[#0A1128] hover:text-[#D4AF37] transition">
              Assets
            </a>
            <a href="/contact" className="text-[#D4AF37] font-semibold">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-[#0A1128] mb-6 text-center">
            Get in Touch
          </h1>
          <p className="text-xl text-[#0A1128] opacity-80 text-center mb-12">
            Have questions about tokenized assets? Ready to invest? Let's talk.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-[#0A1128] text-[#F8F1E9]">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mail size={40} className="text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="opacity-80">hello@autotoken.me</p>
            </div>
            <div className="text-center">
              <Phone size={40} className="text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="opacity-80">+971 (0) 4 XXX XXXX</p>
            </div>
            <div className="text-center">
              <MapPin size={40} className="text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="opacity-80">Dubai, UAE</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="container max-w-3xl">
          <div className="bg-white border-2 border-[#D4AF37] rounded-lg p-10">
            <h2 className="text-3xl font-bold text-[#0A1128] mb-8">Send us a Message</h2>

            {/* Inquiry Type Selection */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-[#0A1128] mb-4">
                What is your inquiry about?
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {inquiryTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.inquiryType === type.value
                        ? 'border-[#D4AF37] bg-[#F8F1E9]'
                        : 'border-[#E8E0D5] hover:border-[#D4AF37]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="inquiryType"
                      value={type.value}
                      checked={formData.inquiryType === type.value}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <div>
                      <p className="font-semibold text-[#0A1128]">{type.label}</p>
                      <p className="text-sm text-[#0A1128] opacity-70">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1128] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A1128] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1128] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128]"
                    placeholder="+971 (0) 4 XXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A1128] mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128]"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1128] mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#0A1128] resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0A1128] text-[#F8F1E9] hover:bg-[#D4AF37] hover:text-[#0A1128] px-8 py-3 text-lg font-semibold flex items-center gap-2"
                >
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#D4AF37] text-[#0A1128] hover:bg-[#F8F1E9] px-8 py-3 text-lg"
                  onClick={() => {
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      inquiryType: 'investor',
                      company: '',
                      message: '',
                    });
                  }}
                >
                  Clear
                </Button>
              </div>

              <p className="text-sm text-[#0A1128] opacity-70">
                * Required fields. We respect your privacy and will only use your information to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1128] text-[#F8F1E9] py-12 border-t-2 border-[#D4AF37]">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">autotoken.me</h4>
              <p className="text-sm opacity-70">
                Tokenizing luxury automobiles into digital investment assets.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="/" className="hover:text-[#D4AF37]">Home</a></li>
                <li><a href="/#era" className="hover:text-[#D4AF37]">The Era</a></li>
                <li><a href="/#concepts" className="hover:text-[#D4AF37]">Concepts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:text-[#D4AF37]">Terms</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Privacy</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:text-[#D4AF37]">Twitter</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">LinkedIn</a></li>
                <li><a href="/contact" className="hover:text-[#D4AF37]">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#D4AF37] border-opacity-30 pt-8 text-center text-sm opacity-70">
            <p>&copy; 2026 autotoken.me. All rights reserved. Regulated by VARA.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
