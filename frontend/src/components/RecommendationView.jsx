function RecommendationView({ recommendation }) {

    if (
        !recommendation ||
        !recommendation.peerComparison ||
        recommendation.peerComparison.length === 0
    ) {
        return null;
    }

    const bestPolicy =
        recommendation.peerComparison[0];


    return (
        <div className="mt-8 space-y-8">

            <div className="p-6 border rounded-2xl shadow">

                <h2 className="text-2xl font-bold mb-4">
                    Peer Comparison
                </h2>

                <div className="overflow-auto">

                    <table className="w-full border">

                        <thead>
                            <tr className="border">
                                <th className="p-2">Policy</th>
                                <th className="p-2">Insurer</th>
                                <th className="p-2">Premium</th>
                                <th className="p-2">Cover</th>
                                <th className="p-2">Waiting</th>
                                <th className="p-2">Benefit</th>
                                <th className="p-2">Score</th>
                            </tr>
                        </thead>


                        <tbody>

                            {
                                recommendation.peerComparison.map(
                                    function (policy, index) {

                                        return (
                                            <tr
                                                key={index}
                                                className="border"
                                            >

                                                <td className="p-2">
                                                    {policy.policyName}
                                                </td>

                                                <td className="p-2">
                                                    {policy.insurer}
                                                </td>

                                                <td className="p-2">
                                                    {policy.premium}
                                                </td>

                                                <td className="p-2">
                                                    {policy.coverAmount}
                                                </td>

                                                <td className="p-2">
                                                    {policy.waitingPeriodMonths}
                                                </td>

                                                <td className="p-2">
                                                    {policy.keyBenefit}
                                                </td>

                                                <td className="p-2">
                                                    {policy.suitabilityScore}
                                                </td>

                                            </tr>
                                        );

                                    }
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>



            <div className="p-6 border rounded-2xl shadow">

                <h2 className="text-2xl font-bold mb-4">
                    Coverage Details
                </h2>

                <p>
                    <b>Inclusions:</b>{" "}
                    {
                        recommendation
                            .coverageDetails
                            .inclusions
                            .join(", ")
                    }
                </p>


                <p>
                    <b>Exclusions:</b>{" "}
                    {
                        recommendation
                            .coverageDetails
                            .exclusions
                            .join(", ")
                    }
                </p>


                <p>
                    <b>Sub-limits:</b>{" "}
                    {
                        recommendation
                            .coverageDetails
                            .subLimits
                    }
                </p>


                <p>
                    <b>Co-pay:</b>{" "}
                    {
                        recommendation
                            .coverageDetails
                            .copayPercent
                    }%
                </p>


                <p>
                    <b>Claim Type:</b>{" "}
                    {
                        recommendation
                            .coverageDetails
                            .claimType
                    }
                </p>

            </div>



            <div className="p-6 border rounded-2xl shadow">

                <h2 className="text-2xl font-bold mb-4">
                    Why This Policy
                </h2>

                <p className="whitespace-pre-line">
                    {
                        recommendation
                            .whyThisPolicy
                    }
                </p>

            </div>

        </div>
    );
}

export default RecommendationView;