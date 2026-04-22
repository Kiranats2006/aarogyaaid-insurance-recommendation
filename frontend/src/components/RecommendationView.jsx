function RecommendationView({ recommendation }) {
    if (!recommendation || !recommendation.peerComparison || recommendation.peerComparison.length === 0) {
        return null;
    }

    const bestPolicy = recommendation.peerComparison[0];

    return (
        <div className="mt-8 space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-600 rounded-lg p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Peer Comparison</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-blue-200">
                                <th className="text-left py-3 px-3 text-sm font-semibold text-gray-700">Policy</th>
                                <th className="text-left py-3 px-3 text-sm font-semibold text-gray-700">Insurer</th>
                                <th className="text-left py-3 px-3 text-sm font-semibold text-gray-700">Premium</th>
                                <th className="text-left py-3 px-3 text-sm font-semibold text-gray-700">Cover</th>
                                <th className="text-left py-3 px-3 text-sm font-semibold text-gray-700">Waiting</th>
                                <th className="text-left py-3 px-3 text-sm font-semibold text-gray-700">Benefit</th>
                                <th className="text-left py-3 px-3 text-sm font-semibold text-gray-700">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendation.peerComparison.map((policy, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-white/50 transition">
                                    <td className="py-3 px-3 text-sm text-gray-800 font-medium">{policy.policyName}</td>
                                    <td className="py-3 px-3 text-sm text-gray-600">{policy.insurer}</td>
                                    <td className="py-3 px-3 text-sm text-gray-800 font-medium">{policy.premium}</td>
                                    <td className="py-3 px-3 text-sm text-gray-600">{policy.coverAmount}</td>
                                    <td className="py-3 px-3 text-sm text-gray-600">{policy.waitingPeriodMonths}</td>
                                    <td className="py-3 px-3 text-sm text-gray-600">{policy.keyBenefit}</td>
                                    <td className="py-3 px-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {policy.suitabilityScore}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-600 rounded-lg p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Coverage Details</h2>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Inclusions:</span>
                        <span className="text-gray-600">{recommendation.coverageDetails.inclusions.join(", ")}</span>
                    </div>
                    <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Exclusions:</span>
                        <span className="text-gray-600">{recommendation.coverageDetails.exclusions.join(", ")}</span>
                    </div>
                    <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Sub-limits:</span>
                        <span className="text-gray-600">{recommendation.coverageDetails.subLimits}</span>
                    </div>
                    <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Co-pay:</span>
                        <span className="text-gray-600">{recommendation.coverageDetails.copayPercent}%</span>
                    </div>
                    <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Claim Type:</span>
                        <span className="text-gray-600">{recommendation.coverageDetails.claimType}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-600 rounded-lg p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Why This Policy</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {recommendation.whyThisPolicy}
                </p>
            </div>
        </div>
    );
}

export default RecommendationView;