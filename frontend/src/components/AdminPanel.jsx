import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    async function loadDocuments() {
        try {
            const response = await axios.get("http://localhost:5000/admin/documents", {
                auth: { username: "admin", password: "admin123" }
            });
            setDocuments(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadDocuments();
    }, []);

    async function uploadFile() {
        if (!file) return;

        const formData = new FormData();
        formData.append("policyFile", file);
        setUploading(true);

        try {
            await axios.post("http://localhost:5000/admin/upload", formData, {
                auth: { username: import.meta.env.VITE_ADMIN_USER,
                        password: import.meta.env.VITE_ADMIN_PASS }
            });
            loadDocuments();
            setFile(null);
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    }

    async function deleteFile(fileName) {
        if (!window.confirm("Are you sure you want to delete this document?")) return;
        
        try {
            await axios.delete(`http://localhost:5000/admin/document/${fileName}?confirm=yes`, {
                auth: { username: "admin", password: "admin123" }
            });
            loadDocuments();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-600 rounded-lg p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">Knowledge Base Manager</h2>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">Upload New Policy Document</h3>
                    <div className="flex gap-3">
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <button
                            onClick={uploadFile}
                            disabled={!file || uploading}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition duration-200"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                    {file && (
                        <p className="mt-2 text-sm text-gray-500">
                            Selected: {file.name}
                        </p>
                    )}
                </div>

                <div>
                    <h3 className="font-medium text-gray-900 mb-4">Uploaded Documents ({documents.length})</h3>
                    {documents.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-500">No documents uploaded yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {documents.map((doc, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                <p className="font-medium text-gray-900">{doc.fileName}</p>
                                            </div>
                                            <div className="ml-6 space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Policy:</span> {doc.policyName}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Type:</span>{" "}
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {doc.fileType}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteFile(doc.fileName)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;