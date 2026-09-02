'use client';

import { useState, useEffect } from 'react';
import { Star, Building2, User, MessageSquare } from 'lucide-react';
import { IReview } from '@/types';
import { defaultReviews } from '@/lib/constants';

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<'CLIENT' | 'EMPLOYEE'>('CLIENT');
  const [reviews, setReviews] = useState<IReview[]>(defaultReviews as IReview[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('/api/admin/reviews');
        const data = await res.json();
        if (data.success && data.reviews.length > 0) {
          setReviews(data.reviews);
        } else {
          setReviews(defaultReviews as IReview[]);
        }
      } catch (err) {
        console.error('Failed loading reviews:', err);
        setReviews(defaultReviews as IReview[]);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  const clientReviews = reviews.filter((r) => r.reviewType === 'CLIENT' && (r.isPublished !== false));
  const employeeReviews = reviews.filter((r) => r.reviewType === 'EMPLOYEE' && (r.isPublished !== false));

  const currentList = activeTab === 'CLIENT' ? clientReviews : employeeReviews;

  return (
    <div className="space-y-12 py-12">
      
      {/* HEADER */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">Feedback & Experiences</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Client & Employee Experiences
            </h1>
            <p className="text-lg text-slate-300">
              Read transparent feedback from business clients using our support services and team members working on flexible projects.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* TABS SWITCHER */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('CLIENT')}
              className={`pb-4 px-6 font-bold text-sm sm:text-base border-b-2 transition-all ${
                activeTab === 'CLIENT'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Client Feedback ({clientReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('EMPLOYEE')}
              className={`pb-4 px-6 font-bold text-sm sm:text-base border-b-2 transition-all ${
                activeTab === 'EMPLOYEE'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Employee & Team Reviews ({employeeReviews.length})
            </button>
          </div>
        </div>

        {/* REVIEW CARDS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white p-6 rounded-xl border border-slate-200 animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-16 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : currentList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <p className="text-slate-700 font-semibold">
              {activeTab === 'CLIENT'
                ? 'Client feedback will appear here as we complete projects.'
                : 'Employee reviews will appear here as campaign teams complete assignments.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentList.map((rev) => (
              <div
                key={rev._id || rev.name}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-900">
                      {rev.isSample ? 'Sample Review' : `${activeTab} FEEDBACK`}
                    </span>
                    <div className="flex text-amber-400 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                    "{rev.reviewText}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                      {activeTab === 'CLIENT' ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{rev.name}</p>
                      <p className="text-slate-500 text-[11px]">{rev.roleOrCompany}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
