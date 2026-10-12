'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { IReview } from '@/types';
import { Plus, Star, Trash2, Edit2, X } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState<IReview | null>(null);

  const [formData, setFormData] = useState({
    reviewType: 'CLIENT',
    name: '',
    roleOrCompany: '',
    rating: 5,
    reviewText: '',
    isSample: false,
    isPublished: true,
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({
      reviewType: 'CLIENT',
      name: '',
      roleOrCompany: '',
      rating: 5,
      reviewText: '',
      isSample: false,
      isPublished: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (rev: IReview) => {
    setEditingReview(rev);
    setFormData({
      reviewType: rev.reviewType,
      name: rev.name,
      roleOrCompany: rev.roleOrCompany,
      rating: rev.rating,
      reviewText: rev.reviewText,
      isSample: rev.isSample || false,
      isPublished: rev.isPublished,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingReview ? 'PUT' : 'POST';
      const bodyData = editingReview ? { _id: editingReview._id, ...formData } : formData;

      const res = await fetch('/api/admin/reviews', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed.');

      setShowModal(false);
      fetchReviews();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      alert('Delete failed.');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-slate-50 m-0 p-0">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 xl:p-10 space-y-6 w-full min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-[#064E3B]">Reviews & Testimonials Manager</h1>
              <p className="text-xs text-slate-500">Publish or unpublish client and candidate reviews.</p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#064E3B] text-[#f8e7c9] text-xs font-semibold hover:bg-[#04382a] transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Review
            </button>
          </div>

          {loading ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="font-bold text-slate-800">No reviews found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev) => (
                <div key={rev._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#e6f4f0] text-[#064E3B]">
                        {rev.reviewType} REVIEW {rev.isSample ? '(Sample)' : ''}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${rev.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {rev.isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </div>

                    <p className="text-slate-700 text-xs italic leading-relaxed">"{rev.reviewText}"</p>

                    <div className="text-xs font-bold text-slate-900 pt-2 border-t border-slate-100">
                      {rev.name} <span className="font-normal text-slate-500">({rev.roleOrCompany})</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex text-[#c69446]">
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenEdit(rev)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(rev._id!)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ADD/EDIT MODAL */}
          {showModal && (
            <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-base font-bold text-[#064E3B]">
                    {editingReview ? 'Edit Review' : 'Add New Review'}
                  </h2>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Review Type *</label>
                      <select
                        value={formData.reviewType}
                        onChange={(e) => setFormData({ ...formData, reviewType: e.target.value as any })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="CLIENT">CLIENT</option>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Rating (1 to 5) *</label>
                      <select
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Role or Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. B2B Client or Telecaller"
                        value={formData.roleOrCompany}
                        onChange={(e) => setFormData({ ...formData, roleOrCompany: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Review Content *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.reviewText}
                      onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={formData.isSample}
                        onChange={(e) => setFormData({ ...formData, isSample: e.target.checked })}
                        className="rounded text-[#064E3B] focus:ring-[#064E3B]"
                      />
                      Mark as Sample Review
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="rounded text-[#064E3B] focus:ring-[#064E3B]"
                      />
                      Publish on Website
                    </label>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 rounded-lg bg-slate-100 font-semibold text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#064E3B] font-semibold text-[#f8e7c9] hover:bg-[#04382a]"
                    >
                      Save Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
    </div>
  );
}

