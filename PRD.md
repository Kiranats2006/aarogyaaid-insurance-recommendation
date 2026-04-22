# Product Requirements Document (PRD)

## 1. User Profile

Primary user is an adult health insurance seeker in India with limited insurance literacy, concerned about hospital costs, uncertain about exclusions, and looking for guidance choosing a suitable policy.

## 2. Problem Statement

Users struggle to compare health insurance policies because policy documents are difficult to interpret, exclusions are unclear, and important concepts like waiting periods or co-pay are poorly understood. This platform helps users match their health and financial profile to suitable policies using explainable AI recommendations.

## 3. Feature Priority

1. Recommendation Engine (highest priority)
Core feature required to help users choose a policy.

2. Document Intelligence (RAG)
Policy data should come from uploaded documents, not model assumptions.

3. Interactive Chat Explainer
Allows users to understand policy terms and ask follow-up questions.

4. Admin Knowledge Base Panel
Allows policy data to be updated without code changes.

## 4. Recommendation Logic

The recommendation uses all six user inputs.

- Full Name personalizes responses.
- Age influences premium sensitivity and waiting period considerations.
- Lifestyle influences risk weighting.
- Pre-existing conditions affect exclusion and waiting period matching.
- Income band affects affordability thresholds.
- City tier influences hospital network suitability.

Policies are first filtered for incompatibilities, then ranked using suitability factors including coverage fit, waiting period, affordability, and network suitability.

## 5. Assumptions

Assumptions:
- Uploaded policy documents contain structured coverage information.
- Premium and waiting period data are available.
- Users provide truthful health profile information.
- This prototype evaluates suitability, not legal or medical advice.

## 6. Out of Scope

Out of Scope:
- Real insurer integrations
- Live premium underwriting
- Claims processing
- Medical advice
- Production-scale user authentication