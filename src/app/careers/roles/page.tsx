'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Briefcase, MapPin, ArrowRight, X } from 'lucide-react';
import { IJobRole } from '@/types';
import { defaultJobRoles } from '@/lib/constants';

export default function AvailableRolesPage() {
  const [roles, setRoles] = useState<IJobRole[]>(defaultJobRoles as IJobRole[]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('ALL');

  useEffect(() => {
    async function fetchRoles() {
      try {
        const res = await fetch('/api/roles');
        const data = await res.json();
        if (data.success && data.roles.length > 0) {
          setRoles(data.roles);
        } else {
          setRoles(defaultJobRoles as IJobRole[]);
        }
      } catch (err) {
        console.error('Failed loading roles:', err);
        setRoles(defaultJobRoles as IJobRole[]);
      } finally {
        setLoading(false);
      }
    }
    fetchRoles();
  }, []);

  const categories = [
    'ALL',
    'Sales & Telecalling',
    'Customer Support',
    'Chat Support',
    'Email Support',
    'Data Entry',
    'Lead Generation',
    'Back Office Support',
    'Virtual Assistance',
  ];

  const workTypes = ['ALL', 'Full-Time', 'Part-Time', 'Work From Home'];

  const filteredRoles = roles.filter((role) => {
    // Search query match
    const matchesSearch =
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category match
    const matchesCategory = selectedCategory === 'ALL' || role.category === selectedCategory;

    // Work type match
    const matchesWorkType =
      selectedWorkType === 'ALL' ||
      (selectedWorkType === 'Work From Home' && role.workMode === 'Work From Home') ||
      role.workType.includes(selectedWorkType as any);

    return matchesSearch && matchesCategory && matchesWorkType;
  });

  return (
    <div className="space-y-12 py-12">
      
      {/* HEADER */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">Available Work Vacancies</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Current Work Opportunities
            </h1>
            <p className="text-lg text-slate-300">
              Browse open freelance, BPO, and remote support positions. Filter by work mode or category to find suitable roles.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search roles by title, keyword, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Work type selector */}
            <div className="w-full lg:w-56">
              <select
                value={selectedWorkType}
                onChange={(e) => setSelectedWorkType(e.target.value)}
                className="w-full py-2.5 px-3 rounded-lg border border-slate-300 text-sm bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                <option value="ALL">All Work Types</option>
                {workTypes.filter((wt) => wt !== 'ALL').map((wt) => (
                  <option key={wt} value={wt}>
                    {wt}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Category Filter
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LISTINGS RESULTS */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white p-6 rounded-xl border border-slate-200 animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-12 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredRoles.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Matching Roles Found</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No matching roles are currently available for your selected filters. Check back soon or submit your details for future opportunities.
            </p>
            <div className="pt-2">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800"
              >
                Submit General Application
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* ROLE CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoles.map((role) => (
              <div
                key={role._id || role.slug}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-900 border border-blue-100">
                      {role.category}
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {role.workMode}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{role.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Requirements Highlights */}
                  {role.requirements && role.requirements.length > 0 && (
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold uppercase text-slate-500 block">Key Requirements:</span>
                      <ul className="text-xs text-slate-700 space-y-1">
                        {role.requirements.slice(0, 2).map((req, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 truncate">
                            <span className="text-blue-600 font-bold">•</span>
                            <span className="truncate">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {role.workType?.map((wt) => (
                      <span key={wt} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                        {wt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/careers/${role.slug}`}
                    className="text-xs font-bold text-slate-700 hover:text-blue-900"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/apply?role=${encodeURIComponent(role.title)}`}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 transition-colors shadow-xs"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
