import { useState } from "react";
import axios from "axios";
import RecommendationView from "./RecommendationView";
import ChatPanel from "./ChatPanel";

function ProfileForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        lifestyle: "",
        condition: "",
        income: "",
        city: ""
    });

    const [recommendation, setRecommendation] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/recommend",
                formData
            );

            if (response.data && response.data.peerComparison) {
                setRecommendation(response.data);
                return;
            }

            if (response.data && response.data.message) {
                setErrorMessage(response.data.message);
                return;
            }

            if (response.data && response.data.error) {
                setErrorMessage(response.data.error);
                return;
            }

            setErrorMessage("Unexpected response received.");
        } catch (error) {
            console.error(error);
            setErrorMessage("Could not load recommendation.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                        Find Your Best Fit Policy
                    </h1>
                    <p className="text-gray-500">
                        Tell us about yourself and we'll match you with the perfect insurance
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            name="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age
                            </label>
                            <input
                                name="age"
                                type="number"
                                placeholder="e.g., 35"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lifestyle
                            </label>
                            <select
                                name="lifestyle"
                                value={formData.lifestyle}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="">Select Lifestyle</option>
                                <option>Sedentary</option>
                                <option>Moderate</option>
                                <option>Active</option>
                                <option>Athlete</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Health Condition
                            </label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="">Select Condition</option>
                                <option>Diabetes</option>
                                <option>Hypertension</option>
                                <option>Asthma</option>
                                <option>Cardiac</option>
                                <option>None</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Annual Income
                            </label>
                            <select
                                name="income"
                                value={formData.income}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="">Select Income Band</option>
                                <option>under 3L</option>
                                <option>3-8L</option>
                                <option>8-15L</option>
                                <option>15L+</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            City Tier
                        </label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="">Select City Tier</option>
                            <option>Metro</option>
                            <option>Tier-2</option>
                            <option>Tier-3</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Finding Best Policy...
                            </span>
                        ) : (
                            "Get Recommendation"
                        )}
                    </button>
                </form>

                {errorMessage && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm flex items-start gap-2">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {errorMessage}
                        </p>
                    </div>
                )}

                <RecommendationView recommendation={recommendation} />
                {recommendation && <ChatPanel userProfile={formData} />}
            </div>
        </div>
    );
}

export default ProfileForm;