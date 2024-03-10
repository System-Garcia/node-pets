# User Story Format Documentation

## Introduction

User stories are concise, straightforward descriptions of a feature from the perspective of the user who desires the new capability. They are a fundamental component of Agile software development, aiding teams in concentrating on user needs.

## User Story Template

As a [Role],
I want [Feature]
So that [Benefit/Value].

## Components of a User Story

- **Title**: A concise, descriptive title for the feature.
- **Role**: The persona or role of the user who will benefit from the feature.
- **Feature**: The functionality or action that the user desires.
- **Benefit/Value**: The advantage or value that the user gains from the feature.

## Example User Story

**Title:** Easy Pet Reporting

As a pet owner,
I want to easily report a lost pet,
So that the community can help me find them quickly.


## Acceptance Criteria (DoD)

Acceptance Criteria define the boundaries of a user story and are used to confirm when a story is complete and functioning as intended.

**Example:**

- The 'Report' button must be clearly visible on the home page.
- The reporting form must include fields for the pet's name, breed, last known location, and the owner's contact information.
- Users must be able to upload a photo of their pet.
- Upon submission, the report should be visible to the community and the user should receive a confirmation message.

## Definition of Ready (DoR)

The Definition of Ready ensures that stories are sufficiently prepared for development.

- User stories must have clear, detailed acceptance criteria.
- The story must be achievable for the team to complete within a sprint.
- All dependencies should be identified and resolved or planned for.

## Gherkin Language for Behavior-Driven Development (BDD)

Gherkin is a set of grammar rules that make behavior descriptions readable and understandable by all project participants, including non-technical stakeholders.

**Format:**

Feature: [One-line description of the feature]
As a [role],
I want [feature],
So that [benefit].

Scenario: [One-line description of the scenario]
Given [context or background],
When [event or action],
Then [expected outcome].

## Sources of Support

- Conducting user story workshops with stakeholders.
- Utilizing Agile/Scrum training materials.
- Implementing tools such as Jira, Trello, or Pivotal Tracker.
- Reference materials like "User Stories Applied" by Mike Cohn.

## Conclusion

Well-defined user stories, coupled with clear Definitions of Done and Ready, are crucial for Agile teams to deliver value effectively. This document serves as a reference for writing and assessing user stories within our project.


