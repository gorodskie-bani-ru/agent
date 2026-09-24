# Local development

- Never start or restart services, development servers, or containers. Ask the user to manage them when needed.
- Use the existing application at http://localhost:3000 for browser verification.
- Follow wiki/code-style.md. Check TypeScript with `npm run types`.
- Code style: ./wiki/code-style.md

# Styled components

- Extract all key component nodes into separate styled components. Use the naming pattern `[ComponentName][NodeName]Styled`; the root may use `[ComponentName]Styled`.
- For example, a section inside `MainPageViewStyled` must be represented by `MainPageViewSectionStyled = styled.section` and rendered as `<MainPageViewSectionStyled>`.
- Use these styled components as selectors (`${MainPageViewSectionStyled}`) when styling them from a parent or within responsive rules. Do not target key nodes through CSS class names or generic HTML tag selectors.
- Keep each node's own styles in its styled component; use component selectors for contextual overrides and interactions between nodes. Preserve semantic HTML and existing behavior when refactoring.
