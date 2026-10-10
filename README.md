# Skill Intelligence Dashboard — PS-02

A React + Vite starter dashboard inspired by the screenshots provided. It includes:
- Dark purple dashboard layout and sidebar navigation
- Skills Signal Engine with editable candidate fields and keyword-based candidate skill extraction
- Evidence snippets, heuristic confidence labels, and skill filtering
- Target-role checklist for transition analysis
- Learning roadmap with milestone checkboxes
- Proof-of-Skill Passport view
- Evaluation checklist
- Aggregate Signals placeholder view

## Requirements
- Node.js 18 or newer (Node.js 20 LTS recommended)
- npm
- VS Code

## Run in VS Code
1. Extract this ZIP.
2. Open the extracted `skill-intelligence-dashboard` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173/`.

## Important limitations
- This is a starter implementation based on the screenshots, not a copy of the Antigravity workspace files.
- Sample personas and initial skills are illustrative demo data.
- Skill extraction uses simple keyword matching, not a trained AI model.
- Confidence values are heuristic and not calibrated probabilities.
- PDF/DOCX files are not parsed; TXT/MD files can be read in the browser.
- No verified Indian Skills Dataset or labor-market dataset is included.
- Aggregate Signals therefore intentionally does not invent wage/growth/automation statistics.
- Role requirements are demo checklists, not official occupation standards.
- Proof-of-Skill entries are not independently verified.
- No transition probability model is implemented.

For a PS evaluation, connect the actual supplied dataset, add a reviewed test set, and measure extraction and mapping performance before claiming validated results.
