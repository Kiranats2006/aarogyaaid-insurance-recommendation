import { useState } from "react";
import axios from "axios";
import RecommendationView from "./RecommendationView";
import ChatPanel from "./ChatPanel";

function ProfileForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        lifestyle: "",
        condition: [],
        income: "",
        city: ""
    });

    const [recommendation, setRecommendation] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConditionDropdown, setShowConditionDropdown] = useState(false);

    const conditionOptions = [
        { value: "Diabetes", label: "Diabetes", color: "blue" },
        { value: "Hypertension", label: "Hypertension", color: "red" },
        { value: "Asthma", label: "Asthma", color: "green" },
        { value: "Cardiac", label: "Cardiac", color: "purple" },
        { value: "None", label: "None", color: "gray" }
    ];

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function toggleCondition(conditionValue) {
        let updatedConditions;
        
        if (conditionValue === "None") {
            // If "None" is selected, clear all other conditions
            updatedConditions = ["None"];
        } else {
            // Remove "None" if it exists and toggle the selected condition
            const conditionsWithoutNone = formData.condition.filter(c => c !== "None");
            
            if (conditionsWithoutNone.includes(conditionValue)) {
                updatedConditions = conditionsWithoutNone.filter(c => c !== conditionValue);
            } else {
                updatedConditions = [...conditionsWithoutNone, conditionValue];
            }
        }
        
        setFormData({
            ...formData,
            condition: updatedConditions
        });
    }

    function removeCondition(conditionValue) {
        setFormData({
            ...formData,
            condition: formData.condition.filter(c => c !== conditionValue)
        });
    }

    function getConditionColor(value) {
        const option = conditionOptions.find(opt => opt.value === value);
        const colors = {
            blue: "bg-blue-100 text-blue-800 border-blue-200",
            red: "bg-red-100 text-red-800 border-red-200",
            green: "bg-green-100 text-green-800 border-green-200",
            purple: "bg-purple-100 text-purple-800 border-purple-200",
            gray: "bg-gray-100 text-gray-800 border-gray-200"
        };
        return colors[option?.color] || colors.gray;
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
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                        Find Your Best Fit Policy
                    </h1>
                    <p className="text-gray-500">
                        Tell us about yourself and we'll match you with the perfect insurance
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <input
                                name="fullName"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition"
                            />
                        </div>
                    </div>

                    {/* Age & Lifestyle */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                    </svg>
                                </span>
                                <input
                                    name="age"
                                    type="number"
                                    placeholder="e.g., 35"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lifestyle
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </span>
                                <select
                                    name="lifestyle"
                                    value={formData.lifestyle}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition appearance-none"
                                >
                                    <option value="">Select Lifestyle</option>
                                    <option>Sedentary</option>
                                    <option>Moderate</option>
                                    <option>Active</option>
                                    <option>Athlete</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Health Conditions - Multi Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Health Conditions
                        </label>
                        
                        {/* Selected Conditions Tags */}
                        {formData.condition.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.condition.map(condition => (
                                    <span
                                        key={condition}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${getConditionColor(condition)}`}
                                    >
                                        {condition}
                                        <button
                                            type="button"
                                            onClick={() => removeCondition(condition)}
                                            className="hover:bg-black/5 rounded-full p-0.5 transition"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Condition Selector */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowConditionDropdown(!showConditionDropdown)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition text-left flex items-center justify-between"
                            >
                                <span className="text-gray-700">
                                    {formData.condition.length > 0 
                                        ? `${formData.condition.length} condition${formData.condition.length > 1 ? 's' : ''} selected`
                                        : "Select health conditions"}
                                </span>
                                <svg 
                                    className={`w-5 h-5 text-gray-400 transition-transform ${showConditionDropdown ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {showConditionDropdown && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-10" 
                                        onClick={() => setShowConditionDropdown(false)}
                                    />
                                    <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                        {conditionOptions.map(option => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    toggleCondition(option.value);
                                                    if (option.value === "None" && !formData.condition.includes("None")) {
                                                        setShowConditionDropdown(false);
                                                    }
                                                }}
                                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center justify-between ${
                                                    formData.condition.includes(option.value) ? 'bg-blue-50' : ''
                                                }`}
                                            >
                                                <span className="text-gray-700">{option.label}</span>
                                                {formData.condition.includes(option.value) && (
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <p className="mt-1.5 text-xs text-gray-500">
                            {formData.condition.includes("None") 
                                ? "No health conditions selected"
                                : "You can select multiple conditions"}
                        </p>
                    </div>

                    {/* Income & City */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Annual Income
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <select
                                    name="income"
                                    value={formData.income}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition appearance-none"
                                >
                                    <option value="">Select Income Band</option>
                                    <option>under 3L</option>
                                    <option>3-8L</option>
                                    <option>8-15L</option>
                                    <option>15L+</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City Tier
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition appearance-none"
                                >
                                    <option value="">Select City Tier</option>
                                    <option>Metro</option>
                                    <option>Tier-2</option>
                                    <option>Tier-3</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-sm hover:shadow"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Finding Best Policy...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Get Recommendation
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        )}
                    </button>
                </form>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm flex items-start gap-2">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {errorMessage}
                        </p>
                    </div>
                )}

                {/* Results */}
                <RecommendationView recommendation={recommendation} />
                {recommendation && <ChatPanel userProfile={formData} />}
            </div>
        </div>
    );
}

export default ProfileForm;