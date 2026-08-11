import React, { useState } from 'react';
import { User, Mail, Phone, Building2, Globe, MapPin, CheckCircle2 } from 'lucide-react';
import { Customer, CustomerStatus } from '../../../types';
import { Button } from '../../../components/ui/Button/Button';

interface CustomerFormProps {
  initialValues?: Partial<Customer>;
  onSubmit: (values: Omit<Customer, 'id' | 'createdAt'>) => Promise<void>;
  onCancel?: () => void;
  submitText?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: string;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  submitText = 'Save Customer',
}) => {
  const [name, setName] = useState<string>(initialValues?.name || '');
  const [email, setEmail] = useState<string>(initialValues?.email || '');
  const [phone, setPhone] = useState<string>(initialValues?.phone || '');
  const [company, setCompany] = useState<string>(initialValues?.company || '');
  const [status, setStatus] = useState<CustomerStatus>(initialValues?.status || 'Active');
  const [street, setStreet] = useState<string>(initialValues?.address?.street || '');
  const [suite, setSuite] = useState<string>(initialValues?.address?.suite || '');
  const [city, setCity] = useState<string>(initialValues?.address?.city || '');
  const [zipcode, setZipcode] = useState<string>(initialValues?.address?.zipcode || '');
  const [website, setWebsite] = useState<string>(initialValues?.website || '');
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(
    initialValues?.monthlyRevenue || 4500
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!status) {
      newErrors.status = 'Status selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        status,
        address: {
          street: street.trim() || '123 Business Ave',
          suite: suite.trim() || 'Suite 100',
          city: city.trim() || 'San Francisco',
          zipcode: zipcode.trim() || '94105',
        },
        website: website.trim() || 'https://company.com',
        monthlyRevenue: Number(monthlyRevenue) || 4500,
        avatarColor: initialValues?.avatarColor,
      });
    } catch (err) {
      console.error('Error submitting customer form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Primary Info Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Basic Customer Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:ring-brand-500'
                }`}
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="jane.doe@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:ring-brand-500'
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:ring-brand-500'
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Acme Corp"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
                }}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.company
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:ring-brand-500'
                }`}
              />
            </div>
            {errors.company && <p className="mt-1 text-xs text-rose-500">{errors.company}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Status & Preferences
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Status <span className="text-rose-500">*</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CustomerStatus)}
              className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Website URL
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="https://company.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Estimated Monthly MRR ($)
            </label>
            <input
              type="number"
              min={0}
              step={100}
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Address Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Street Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="123 Tech Lane"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Suite / Apt
            </label>
            <input
              type="text"
              placeholder="Suite 400"
              value={suite}
              onChange={(e) => setSuite(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              City
            </label>
            <input
              type="text"
              placeholder="San Francisco"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Zipcode
            </label>
            <input
              type="text"
              placeholder="94107"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          leftIcon={<CheckCircle2 className="w-4 h-4" />}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};
