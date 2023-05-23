import mongoose, { Mongoose } from "mongoose";
import JobModal from "../models/JobModal.js";
import userModal from "../models/userModal.js";



export const jobController = async (req, res, next) => {
    const { position, compayName, jobTitle } = req.body;
    try {
        if (!position || !compayName || !jobTitle) {
            next("Fill All Required Details !")
        }
        req.body.createdBy = req.user.UserId
        const job = await JobModal.create(req.body)
        res.status(201).send({ success: true, msg: "Job Created Successful", job: job })
    } catch (error) {
        next(error)
    }
}

export const getAllJobController = async (req, res, next) => {
    try {
        // const { page,jobsperpage } = req.query
        // const queryObj = {
        //     status:""
        // }
        // if (status || status !== "all") {
        //     queryObj.status = status
        // }

        const page = req.query.page || 1
        const jobsperpage= req.query.jobsperpage || 10
        const skip = (page - 1)*jobsperpage

        // const job = await JobModal.find(queryObj)
        const jobs = await JobModal.countDocuments()
        res.status(200).json({ success: true, totalJobs: job.length, msg: "Get All Jobs Done", data: job })
    } catch (error) {
        next(error)
    }
}


export const getupdatejobcontroller = async (req, res, next) => {
    try {
        const { id } = req.params
        const updatedata = await JobModal.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).send({ success: true, data: updatedata, msg: "Data Updated Successfull !" })
    } catch (error) {
        next(error)
    }
}

export const deleteJobcontroller = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletjob = await JobModal.findByIdAndDelete(id, { new: true })
        if (deletjob === null) return next("Job Already Done")
        res.status(200).send({ success: true, data: deletjob, msg: "Job Remove Successfull" })
    } catch (error) {
        next(error)
    }
}


export const aggregatecontroller = async (req, res, next) => {
    try {
        console.log(req.user.userId)
        const aggrigate = await JobModal.aggregate([
            {
                $match: { workType: "full-time" }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ])
        console.log(aggrigate, "aggrogate")
        res.status(200).send({ msg: "Data Success", totalJobs: aggrigate.length, data: aggrigate })
    } catch (error) {
        next(error)
    }

}