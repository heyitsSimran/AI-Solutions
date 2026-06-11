"use client";

import { useState, useEffect } from "react";

interface RatingScores {
  usability: number;
  accuracy: number;
  support: number;
  overall: number;
}

interface Review {
  id: string;
  customerName: string;
  customerCompany: string;
  ratings: RatingScores;
  comment: string;
  verified: boolean;
  createdAt: string;
}

const RATING_LABELS: Record<keyof RatingScores, string> = {
  usability: "Product Usability",
  accuracy: "AI Model Accuracy",
  support: "Onboarding & Support",
  overall: "Overall Experience",
};

const REVIEWS_PER_PAGE = 6;

export default function ReviewTool() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState<RatingScores>({
    usability: 5,
    accuracy: 5,
    support: 5,
    overall: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/review");
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleRatingChange = (category: keyof RatingScores, val: number) => {
    setRatings((prev) => ({ ...prev, [category]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerCompany: company,
          ratings,
          comment,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setName("");
        setCompany("");
        setComment("");
        setRatings({ usability: 5, accuracy: 5, support: 5, overall: 5 });
        fetchReviews();
      } else {
        setError(data.error || "Failed to submit review");
      }
    } catch (err) {
      console.error("Submit review error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Compute overall statistics
  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);
  const avgOverall =
    totalReviews > 0
      ? (reviews.reduce((acc, rev) => acc + rev.ratings.overall, 0) / totalReviews).toFixed(1)
      : "0.0";

  // Paginated reviews
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const paginatedReviews = reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  return (
    <section id="reviews" className="py-20 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Customer Reviews Tool
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Read verified customer experiences and rate your deployment feedback on multiple system levels.
          </p>
        </div>

        {/* Reviews Dashboard Stats & Submit Review Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          
          {/* Rating Summary Card & Review Form */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Average Rating Widget */}
            <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
              <h3 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Overall Deployment Score
              </h3>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-5xl font-extrabold text-zinc-900 dark:text-zinc-50">{avgOverall}</span>
                <span className="text-zinc-400 dark:text-zinc-500 text-xl font-bold">/ 5.0</span>
              </div>
              <div className="flex justify-center gap-1 mt-2 text-amber-400" aria-label={`Average rating: ${avgOverall} stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < Math.round(Number(avgOverall)) ? "fill-current" : "text-zinc-200 dark:text-zinc-800"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-3">
                Based on {totalReviews} client deployment audits.
              </p>
            </div>

            {/* Submit Review Form */}
            <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Submit Product Review
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label htmlFor="rev-name" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Customer Name
                  </label>
                  <input
                    id="rev-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 bg-transparent dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="rev-company" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Company Name
                  </label>
                  <input
                    id="rev-company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 bg-transparent dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50"
                    placeholder="Matches schedule for verification badge"
                  />
                </div>

                {/* Multi-Level Ratings */}
                <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                  <span className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Rating Dimensions
                  </span>
                  
                  {(Object.keys(RATING_LABELS) as Array<keyof RatingScores>).map((category) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        {RATING_LABELS[category]}
                      </span>
                      <div className="flex gap-1 text-zinc-200 dark:text-zinc-800" role="group" aria-label={`Rate ${RATING_LABELS[category]}`}>
                        {Array.from({ length: 5 }).map((_, idx) => {
                          const ratingVal = idx + 1;
                          const active = ratings[category] >= ratingVal;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleRatingChange(category, ratingVal)}
                              className={`p-0.5 focus:outline-none focus:ring-1 focus:ring-violet-500 rounded ${
                                active ? "text-amber-400" : "text-zinc-200 dark:text-zinc-850 hover:text-amber-300"
                              }`}
                              aria-label={`Rate ${ratingVal} stars out of 5`}
                            >
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900">
                  <label htmlFor="rev-comment" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Feedback Comment
                  </label>
                  <textarea
                    id="rev-comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 bg-transparent dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                {error && <p className="text-xs font-semibold text-rose-600" role="alert">{error}</p>}
                {success && <p className="text-xs font-semibold text-emerald-600" role="alert">Review submitted successfully! Verified loop checked.</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>

          </div>

          {/* Testimonials Listing Grid with Pagination */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-2">
              Recent Deployment Feedback ({totalReviews})
            </h3>
            
            {reviews.length === 0 ? (
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
                <p className="text-zinc-500 dark:text-zinc-400">No client reviews submitted yet. Use the review form on the left to submit a review.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-live="polite">
                  {paginatedReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative"
                    >
                      <div>
                        {/* Top Row: Meta & Verified */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{rev.customerName}</h4>
                            <span className="text-xs text-zinc-400 dark:text-zinc-500">{rev.customerCompany}</span>
                          </div>
                          {rev.verified && (
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200/20"
                              title="Verified Deployment Partner"
                            >
                              <svg className="w-3 h-3 mr-1 fill-current" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.585a.75.75 0 00-1.06 1.06L8.94 8.37l-3.733 3.732a.75.75 0 101.06 1.06L10 9.43l3.733 3.732a.75.75 0 001.06-1.06L11.06 8.37l3.733-3.732a.75.75 0 00-1.06-1.06L10 7.31 6.267 3.585z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/>
                              </svg>
                              Verified Partner
                            </span>
                          )}
                        </div>

                        {/* Comment */}
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic mb-6 line-clamp-3">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>

                      {/* Ratings Grid Details */}
                      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 grid grid-cols-2 gap-x-4 gap-y-2">
                        {(Object.keys(RATING_LABELS) as Array<keyof RatingScores>).map((key) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                              {RATING_LABELS[key]}
                            </span>
                            <div className="flex gap-0.5 text-amber-400 mt-0.5">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <svg
                                  key={idx}
                                  className={`w-3.5 h-3.5 ${idx < rev.ratings[key] ? "fill-current" : "text-zinc-200 dark:text-zinc-800"}`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Showing {startIndex + 1}-{Math.min(startIndex + REVIEWS_PER_PAGE, totalReviews)} of {totalReviews} reviews
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                            currentPage === i + 1
                              ? "bg-violet-600 text-white"
                              : "border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
