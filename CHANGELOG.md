# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Show sections 02 to 05 as hover-reveal cards below the drawing.
- Show sections 02 to 05 as cards opening the details in a hover modal.
- Simplify page chrome: no header, stamp, separators, or footer.
- Add part-of-raulmoracode ecosystem badge above the title.

- Add workshop dossier shell with file strip, colophon, and run/inside/opinions/yours/reference sections.
- Add pinned stack ledger, opinions, fork steps, and command reference.

### Changed

- Move copy command above feature cards for better visibility
- Rewrite colophon description to emphasize speed and AI agent adaptation
- Express trigger styles as Tailwind utilities and drop the unused CSS classes left by the removed drawing and modal.
- Open the detail panel from inline prose triggers instead of a grid of cards.

### Removed

- Remove pipeline drawing SVG section entirely.
- Remove dead rules `.blueprint-grid`, `.stamp`, `.plus`, `.modal-backdrop`, `.modal-panel` and their keyframes.
- Remove the copy install command pill and the empty `App.css`, neither of which was rendered.

### Fixed
