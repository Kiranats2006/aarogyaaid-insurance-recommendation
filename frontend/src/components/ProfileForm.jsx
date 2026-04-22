import { useState } from "react";
import axios from "axios";

function ProfileForm() {

    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        lifestyle: "",
        condition: "",
        income: "",
        city: ""
    });

    const [recommendation, setRecommendation] =
        useState(null);


    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }


    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response =
                await axios.post(
                    "http://localhost:5000/recommend",
                    formData
                );

            setRecommendation(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    }


    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow">

            <h1 className="text-3xl font-bold mb-6">
                Find Your Best Fit Policy
            </h1>


            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />


                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />


                <select
                    name="lifestyle"
                    value={formData.lifestyle}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                >
                    <option value="">
                        Select Lifestyle
                    </option>

                    <option>Sedentary</option>
                    <option>Moderate</option>
                    <option>Active</option>
                    <option>Athlete</option>

                </select>


                <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                >
                    <option value="">
                        Select Condition
                    </option>

                    <option>Diabetes</option>
                    <option>Hypertension</option>
                    <option>Asthma</option>
                    <option>Cardiac</option>
                    <option>None</option>

                </select>


                <select
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                >
                    <option value="">
                        Select Income Band
                    </option>

                    <option>under 3L</option>
                    <option>3-8L</option>
                    <option>8-15L</option>
                    <option>15L+</option>

                </select>


                <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                >
                    <option value="">
                        Select City Tier
                    </option>

                    <option>Metro</option>
                    <option>Tier-2</option>
                    <option>Tier-3</option>

                </select>


                <button
                    className="w-full p-3 rounded bg-black text-white"
                >
                    Get Recommendation
                </button>

            </form>



            {
                recommendation && (

                    <div className="mt-6 p-4 border rounded">

                        <h2 className="font-bold mb-3">
                            Recommendation Loaded
                        </h2>

                        <p>
                            Best Policy:
                            {
                                recommendation
                                    .peerComparison[0]
                                    .policyName
                            }
                        </p>

                    </div>

                )
            }

        </div>
    );

}

export default ProfileForm;