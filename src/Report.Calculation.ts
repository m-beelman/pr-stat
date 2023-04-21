// Copyright (c) 2023 Koninklijke Philips N.V.

import { IPullRequest } from './Interfaces/PullRequestTypes'
import { EventWithTime } from './Interfaces/ReportTypes'

let EventTimeline: EventWithTime[] = []

export const GenerateEventTimeline = (pullRequest: IPullRequest): EventWithTime[] => {
  if (EventTimeline.length > 0) {
    return EventTimeline
  }

  const events: EventWithTime[][] = []

  // merge all interesting events into a single list
  events.push([
    { type: 'createAt', date: new Date(pullRequest.createdAt), event_instance: pullRequest.createdAt, time: 0 },
  ])
  events.push(
    pullRequest.commits.map((commit) => ({
      type: 'commit',
      date: new Date(commit.authorDate),
      event_instance: commit,
      time: 0,
    }))
  )
  events.push(
    pullRequest.reviews.map((review) => ({
      type: 'review',
      date: new Date(review.submittedAt),
      event_instance: review,
      time: 0,
    }))
  )
  events.push(
    pullRequest.statusChecks.map((statusCheck) => ({
      type: 'statusCheck',
      date: new Date(statusCheck.completedAt),
      event_instance: statusCheck,
      time: 0,
    }))
  )
  events.push(
    pullRequest.comments.map((comment) => ({
      type: 'comment',
      date: new Date(comment.createdAt),
      event_instance: comment,
      time: 0,
    }))
  )
  events.push([
    { type: 'mergedAt', date: new Date(pullRequest.mergedAt), event_instance: pullRequest.mergedAt, time: 0 },
  ])
  events.push([
    { type: 'closedAt', date: new Date(pullRequest.closedAt), event_instance: pullRequest.closedAt, time: 0 },
  ])

  // flatten the list
  const flattenedEvents = events.flat()

  // filter out events that don't have a valid date
  const filteredEvents = flattenedEvents.filter((event) => event.date !== null)

  // sort the events by date
  filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime())

  // now, create a list of events with the time between events
  const eventsWithTime: EventWithTime[] = []

  // calculate the time between events
  for (let i = 0; i < filteredEvents.length; i++) {
    if (i === 0) {
      eventsWithTime.push({
        type: filteredEvents[i].type,
        date: filteredEvents[i].date,
        time: 0,
        event_instance: filteredEvents[i].event_instance,
      })
    } else {
      eventsWithTime.push({
        type: filteredEvents[i].type,
        date: filteredEvents[i].date,
        time: (filteredEvents[i].date.getTime() - filteredEvents[i - 1].date.getTime()) / 1000,
        event_instance: filteredEvents[i].event_instance,
      })
    }
  }

  if (EventTimeline === null) {
    EventTimeline = eventsWithTime
  }

  return eventsWithTime
}

export const MillisecondsToReadableDuration = (leadTimeInMSec: number) => {
  const seconds = +(leadTimeInMSec / 1000).toFixed(1)
  const minutes = +(leadTimeInMSec / (1000 * 60)).toFixed(1)
  const hours = +(leadTimeInMSec / (1000 * 60 * 60)).toFixed(1)
  const days = +(leadTimeInMSec / (1000 * 60 * 60 * 24)).toFixed(1)
  if (seconds < 60) return `${seconds} Sec`
  else if (minutes < 60) return `${minutes} Min`
  else if (hours < 24) return `${hours} Hours`
  else return `${days} Days`
}

export const GetLeadTimeForPullRequest = (pullRequest: IPullRequest) => {
  // parse createAt as date from string
  const createAt = new Date(pullRequest.createdAt)
  const mergedAt = new Date(pullRequest.mergedAt)

  const leadTime = mergedAt.getTime() - createAt.getTime()
  return leadTime
}

export const GetTimeSpendOnBranchBeforePRCreated = (pullRequest: IPullRequest) => {
  const eventTimeline = GenerateEventTimeline(pullRequest)
  const createAtEvent = eventTimeline.find((event) => event.type === 'createAt')
  const firstCommitEvent = eventTimeline.find((event) => event.type === 'commit')

  if (createAtEvent && firstCommitEvent && createAtEvent.date.getTime() > firstCommitEvent.date.getTime()) {
    return createAtEvent.date.getTime() - firstCommitEvent.date.getTime()
  }

  return -1
}

export const GetTimeSpendOnBranchBeforePRMerged = (pullRequest: IPullRequest) => {
  const eventTimeline = GenerateEventTimeline(pullRequest)
  const mergedAtEvent = eventTimeline.find((event) => event.type === 'mergedAt')
  const firstCommitEvent = eventTimeline.find((event) => event.type === 'commit')

  if (mergedAtEvent && firstCommitEvent && mergedAtEvent.date.getTime() > firstCommitEvent.date.getTime()) {
    return mergedAtEvent.date.getTime() - firstCommitEvent.date.getTime()
  }

  return -1
}

export const GetTimeToMergeAfterLastReview = (pullRequest: IPullRequest) => {
  const eventTimeline = GenerateEventTimeline(pullRequest)
  const mergedAtEvent = eventTimeline.find((event) => event.type === 'mergedAt')
  const reviewEvents = eventTimeline.filter((event) => event.type === 'review')
  if (reviewEvents.length <= 0) {
    return -1
  }

  const lastReviewEvent = reviewEvents.reverse()[0]
  if (mergedAtEvent && lastReviewEvent && mergedAtEvent.date.getTime() > lastReviewEvent.date.getTime()) {
    return mergedAtEvent.date.getTime() - lastReviewEvent.date.getTime()
  }

  return -1
}
