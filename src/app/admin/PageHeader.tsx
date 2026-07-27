'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  backHref?: string;
  backLabel?: string;
};

export default function PageHeader({
  eyebrow = 'ADMIN WORKSPACE',
  title,
  description,
  badge,
  backHref = '/dashboard',
  backLabel = 'Back to Dashboard',
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <p className="text-xs font-semibold tracking-widest text-indigo-600 mb-2">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="text-gray-500 mt-2">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>
        {badge && (
          <span className="bg-indigo-50 text-indigo-700 text-sm font-medium px-4 py-2 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}