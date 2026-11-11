# Century Financial Group Mortgage Readiness Email Templates

These templates are designed for the **California Mortgage Readiness Assessment**. They use only the data captured by the public assessment, avoid rate promises and approval claims, and restate that the form is not a loan application, prequalification, approval, or commitment to lend.

> **Important operational boundary:** This package provides email content and trigger specifications. It does not activate email delivery, create an email-provider integration, or schedule a sequence. Sending should occur only after a company-approved delivery system, privacy policy, sender identity, opt-out process, and lead-routing destination are confirmed.

## Merge Fields

| Field | Source |
|---|---|
| `{{first_name}}` | Mortgage readiness form: `firstName` |
| `{{last_name}}` | Mortgage readiness form: `lastName` |
| `{{email}}` | Mortgage readiness form: `email` |
| `{{phone}}` | Mortgage readiness form: `phone` |
| `{{preferred_contact}}` | Mortgage readiness form: `preferredContact` |
| `{{mortgage_goal}}` | Assessment: `assessmentGoal` |
| `{{primary_concern}}` | Assessment: `assessmentConcern` |
| `{{timeline}}` | Assessment: `assessmentTimeline` |
| `{{submitted_at}}` | Mortgage readiness form: `createdAt` |
| `{{dashboard_url}}` | Internal lead-dashboard address |
| `{{privacy_policy_url}}` | Company-approved privacy policy URL |
| `{{consultation_url}}` | Company-approved consultation-request or booking URL |
| `{{company_phone}}` | Company-approved phone number |
| `{{company_email}}` | Company-approved response email |

## 1. Internal Notification: Successful Lead Capture

### Trigger and Routing

Send this notification immediately after a successful, server-validated `mortgageLeads.capture` submission has been committed to the database. Route it only to the approved Century Financial Group lead-routing inbox or CRM destination. Do not include the lead’s consent details in a subject line.

| Field | Template value |
|---|---|
| Subject | New Mortgage Readiness Request — {{first_name}} {{last_name}} |
| Preheader | A new educational mortgage-readiness consultation request is ready for review. |
| Reply-to | {{company_email}} |
| CTA | Open Lead Dashboard — {{dashboard_url}} |

### Email Body

```text
New Mortgage Readiness Request

A visitor completed the California Mortgage Readiness Assessment and requested a response.

Lead details
Name: {{first_name}} {{last_name}}
Email: {{email}}
Phone: {{phone}}
Preferred response: {{preferred_contact}}
Submitted: {{submitted_at}}

Assessment context
Mortgage goal: {{mortgage_goal}}
Primary concern: {{primary_concern}}
Timeline: {{timeline}}

Consent record
Contact consent: Confirmed
Privacy acknowledgement: Confirmed
SMS preference: Refer to the lead dashboard before using any text-message workflow.

Next step
Review the lead in the dashboard and follow the approved Century Financial Group response process. This request is an educational consultation inquiry, not a loan application, prequalification, approval, or commitment to lend.

Open lead dashboard: {{dashboard_url}}
```

## 2. Lead Auto-Responder Sequence

Use the sequence only for email addresses collected with the required contact consent. Do not use the optional SMS preference as permission to send email, and do not place the lead into an SMS campaign without a separately approved messaging workflow. Each message should include the company-approved privacy policy and an operational unsubscribe or contact-preference link before release.

| Message | Suggested timing | Purpose | Primary CTA |
|---|---:|---|---|
| Email 1 | Immediately after successful capture | Confirm receipt and reinforce the next educational step. | Review your next step |
| Email 2 | Two business days later | Offer a practical way to clarify the concern selected in the assessment. | Prepare your questions |
| Email 3 | Five business days later | Invite a no-pressure consultation. | Request a consultation |

### Email 1 — Confirmation and Next Step

| Field | Template value |
|---|---|
| Subject | {{first_name}}, your mortgage readiness starting point |
| Preheader | Your request was received. Here is a clear place to begin. |
| CTA | Review your next step — {{consultation_url}} |

```text
Hello {{first_name}},

Thank you for completing the California Mortgage Readiness Assessment with Century Financial Group.

You shared that you are exploring: {{mortgage_goal}}.
The question you want to clarify first is: {{primary_concern}}.
Your timing is: {{timeline}}.

These answers do not determine an approval or recommendation. They simply create a clearer starting point for an educational conversation.

For now, keep your next step simple: write down the questions you would like explained about {{primary_concern}} and gather only the basic information you are comfortable discussing. A California-licensed team member can respond through your selected contact method when you are ready.

Review your next step: {{consultation_url}}

Century Financial Group, Corp.
CA DRE #01930905 · MLO License Endorsement #1974007

This message is educational and is not a loan application, prequalification, approval, or commitment to lend.
Privacy: {{privacy_policy_url}}
Contact preferences / unsubscribe: {{unsubscribe_url}}
```

### Email 2 — Clarify the Question That Matters Most

| Field | Template value |
|---|---|
| Subject | A practical way to prepare for your next mortgage question |
| Preheader | A simple checklist can make the next conversation more useful. |
| CTA | Prepare your questions — {{consultation_url}} |

```text
Hello {{first_name}},

Mortgage decisions can feel complicated when several questions arrive at once. Your assessment indicated that {{primary_concern}} is the area you would most like to clarify.

Before your next conversation, consider preparing three short questions:

1. What does {{primary_concern}} mean for my stated goal of {{mortgage_goal}}?
2. What information would help me understand my options more clearly?
3. What can I do now while I continue to evaluate my timeline of {{timeline}}?

There is no need to share sensitive financial documents through this email. The purpose of a consultation is to help you identify an appropriate next educational step and understand what questions to ask.

Prepare your questions or request a response: {{consultation_url}}

Century Financial Group, Corp.
CA DRE #01930905 · MLO License Endorsement #1974007

This message is educational and is not a loan application, prequalification, approval, or commitment to lend.
Privacy: {{privacy_policy_url}}
Contact preferences / unsubscribe: {{unsubscribe_url}}
```

### Email 3 — No-Pressure Consultation Invitation

| Field | Template value |
|---|---|
| Subject | When you are ready, let’s discuss your next mortgage question |
| Preheader | Request a clear, no-pressure educational conversation. |
| CTA | Request a consultation — {{consultation_url}} |

```text
Hello {{first_name}},

If you are ready to talk through your next mortgage question, Century Financial Group can arrange an educational conversation with a California-licensed team member.

The conversation can begin with your stated goal — {{mortgage_goal}} — and the question you identified around {{primary_concern}}. You may also decide that more preparation time is right for you. Either approach is appropriate.

Request a consultation: {{consultation_url}}

If you prefer to respond directly, contact us at {{company_phone}} or {{company_email}}.

Century Financial Group, Corp.
CA DRE #01930905 · MLO License Endorsement #1974007

This message is educational and is not a loan application, prequalification, approval, or commitment to lend.
Privacy: {{privacy_policy_url}}
Contact preferences / unsubscribe: {{unsubscribe_url}}
```

## Dashboard Component Summary

The website implementation includes an administrator-only Mortgage Readiness Leads dashboard at `/dashboard/mortgage-leads`. The dashboard provides a searchable table with filters for preferred response method, mortgage goal, and stated timeline. It displays contact details, assessment context, consent status, and the submission timestamp. Export actions produce the currently filtered data as a UTF-8 CSV file or an Excel-compatible `.xls` file.

The dashboard does not invent or seed leads. It displays only real mortgage-readiness requests recorded through the public assessment route. Access is restricted through the project’s existing administrator role guard.
