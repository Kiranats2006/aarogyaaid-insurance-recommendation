import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);

    async function loadDocuments() {
        try {
            const response = await axios.get(
                "http://localhost:5000/admin/documents",
                {
                    auth: {
                        username: "admin",
                        password: "admin123"
                    }
                }
            );

            setDocuments(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadDocuments();
    }, []);

    async function uploadFile() {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("policyFile", file);

        try {
            await axios.post(
                "http://localhost:5000/admin/upload",
                formData,
                {
                    auth: {
                        username: "admin",
                        password: "admin123"
                    }
                }
            );

            loadDocuments();

        } catch (error) {
            console.error(error);
        }
    }

    async function deleteFile(fileName) {
        try {
            await axios.delete(
                "http://localhost:5000/admin/document/" +
                fileName +
                "?confirm=yes",
                {
                    auth: {
                        username: "admin",
                        password: "admin123"
                    }
                }
            );

            loadDocuments();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mt-10 p-6 border rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-4">
                Admin Knowledge Base
            </h2>

            <input
                type="file"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
                className="mb-3"
            />

            <button
                onClick={uploadFile}
                className="w-full p-3 rounded bg-black text-white mb-6"
            >
                Upload Policy File
            </button>

            <div className="space-y-3">
                {documents.map(function(doc, index) {
                    return (
                        <div
                            key={index}
                            className="border p-4 rounded"
                        >
                            <p>
                                <b>File:</b> {doc.fileName}
                            </p>

                            <p>
                                <b>Policy:</b> {doc.policyName}
                            </p>

                            <p>
                                <b>Type:</b> {doc.fileType}
                            </p>

                            <button
                                onClick={function() {
                                    deleteFile(doc.fileName);
                                }}
                                className="mt-2 p-2 border rounded"
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminPanel;