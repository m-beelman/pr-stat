// Copyright (c) 2023 Koninklijke Philips N.V.

import { ReportMeasurementEntry } from "../src/Report.Definitions"
import { GetAddedLines, GetDeletedLines, GetChangedFilesCount, GetCommitsCount, GetReviewCount, GetCommentCount } from "../src/Report.Functions"

export const TestReportMeasures = new Array<ReportMeasurementEntry>()
TestReportMeasures.push(new ReportMeasurementEntry("additions", "Additions", 0, 0, "ShowAdditions", GetAddedLines));
TestReportMeasures.push(new ReportMeasurementEntry("deleted", "Deleted", 0, 0, "ShowDeleted", GetDeletedLines));
TestReportMeasures.push(new ReportMeasurementEntry("changedFiles", "Changed Files", 0, 0, "ShowNumberOfChangedFiles", GetChangedFilesCount));
TestReportMeasures.push(new ReportMeasurementEntry("commits", "Commits", 0, 0, "ShowNumberOfCommits", GetCommitsCount));
TestReportMeasures.push(new ReportMeasurementEntry("reviews", "Reviews", 0, 0, "ShowNumberOfReviews", GetReviewCount));
TestReportMeasures.push(new ReportMeasurementEntry("comments", "Comments", 0, 0, "ShowNumberOfComments", GetCommentCount));
