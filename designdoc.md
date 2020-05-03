# BuggingBugs

- BuggingBugs is a universal bug tracking application. It thrives off of it's simplicity, giving software developers an easy time handling bug reports.

# Primary Application

The primary application to BuggingBugs is it's bug tracking system, which is a specialized ticket system.

![Life Cycle of a bug](https://i.imgur.com/eRIuIhh.jpg)
The above diagram illustrates the life cycle of each event in the system. Once a bug is found, a project leader will assign it to an engineer, and they will fix it and seek closure and approval from a project leader once a solution is created. There are one of three roles that each member classifies as.

## Roles

### Project Engineer

- Deals with and provides solutions to submitted bug tickets.

### Quality Assurance Engineer

- Reports bugs to project leaders

### Project Leader

- Receives notifications/ discoveries of bugs, and assigns an engineer to fix them. Approves all solutions.

It's important to note that all three roles can submit bug reports, but any request made by a project or QA engineer must be approved first by a project leader.

## Ticket Structure

Tickets are the primary component to _BuggingBug_. The following are the entries that compose a ticket:

- Priority Bug Levels - 1 Critical; these bugs must be fixed as quickly as possible, and are among the level of security and availability bugs - 2 Urgent: These bugs should be fixed ASAP, and are on the level of hurting usability, or ruining product usage - 3 Medium: These bugs may be rendering features useless, but the system overall stable and still functional - 4 Minor: A minor bug that does not affect usage for a user
- Summary - A brief description about the bug. This should include as much detail as possible.
- Environment
  - A description about which OS, browser, version, ETC
- Tags - Any quick keywords to describe the type or what the bug is. Helps for querying and categorizing the bug.
- Time - A projected amount of time, guessing how long a fix will take
- Due Time - A time that a bug fix is due
- Description - This is where the actual body of the ticket lies. This is where the bug is described in detail.
- Attachments - Any helpful files or images that may work to illustrate a state or description of a bug

## Frontend

The frontend portion can be split into three major groups: Project Engineers, QA Engineers, and project leaders. Each of these roles have their own domain space with different features and capabilities.

### Project Engineer

### Project Leader

### QA Engineer

## Backend
