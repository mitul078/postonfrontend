
"use client"
import React from "react";
import { useForm } from "react-hook-form";
import "./styles/dialog.scss"

const AssignDialog = ({ isOpen, onClose, agentID, onSubmit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const submitHandler = (data) => {
        onSubmit({ ...data, agentID });
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="wrapper fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="box p-6 rounded-xl shadow-lg w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">Assign Package</h2>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                    <div>
                        <label className="block text-sm">Agent ID</label>
                        <input
                            type="text"
                            value={agentID}
                            disabled
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm">Package ID</label>
                        <input
                            {...register("packageID", { required: "Package ID is required" })}
                            className="w-full border p-2 rounded"
                            placeholder="Enter Package ID"
                        />
                        {errors.packageID && <p className="text-red-500 text-sm">{errors.packageID.message}</p>}
                    </div>

                    <div className="btn">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                            className="cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignDialog;
