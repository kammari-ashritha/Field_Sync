import Submission from "../DB/SubmissionModel.js";

export const createSubmission = async (req, res) => {
  const doc = await Submission.create({ ...req.body, workerId: req.user._id });
  res.json({ submission: doc });
};

export const myReports = async (req, res) => {
  const list = await Submission.find({ workerId: req.user._id }).sort({ createdAt: -1 });
  res.json({ submissions: list });
};

export const getAllReports = async (req, res) => {
  const { q, region, activityType, workerId, from, to } = req.query;
  const filter = {};
  if (region) filter.region = region;
  if (activityType) filter.activityType = activityType;
  if (workerId) filter.workerId = workerId;
  if (from || to) {
    filter.dateConducted = {};
    if (from) filter.dateConducted.$gte = new Date(from);
    if (to) filter.dateConducted.$lte = new Date(to);
  }
  if (q) {
    filter.$or = [
      { region: new RegExp(q, "i") },
      { activityType: new RegExp(q, "i") },
      { majorIssue: new RegExp(q, "i") },
      { description: new RegExp(q, "i") },
    ];
  }
  const list = await Submission.find(filter)
    .populate("workerId", "name email")
    .sort({ createdAt: -1 });
  res.json({ submissions: list });
};

export const getStats = async (_req, res) => {
  const all = await Submission.find();
  const totalReports = all.length;
  const totalParticipants = all.reduce((s, r) => s + (r.participantsCount || 0), 0);
  const regions = {};
  const activities = {};
  for (const r of all) {
    regions[r.region] = (regions[r.region] || 0) + 1;
    activities[r.activityType] = (activities[r.activityType] || 0) + 1;
  }
  res.json({ totalReports, totalParticipants, regions, activities });
};
