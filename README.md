# README

# ToDo
## Next
- [ ] Generate simple ToC
  - [X] ~~*Default to all *.md files in current folder*~~ [2023-04-30]
  - [X] ~~*Build top `#` section with name of current folder*~~ [2023-04-30]
  - [ ] Each file get's named by top `#` section in file
    - If none present, use filename
  - Create in new file
    - [X] ~~*File is named same as folder*~~ [2023-04-30]
    - [X] ~~*Overrite existing contents if ran again (allows for updating)*~~ [2023-04-30]
## Later
- CLI command
  - add flags for features
- [ ] recursive setting with optional depth for finding MD files
- [ ] use an existing file with section names where the name is a used tag and all files with those tags get listed under the section
  - *Note, this may be better served by a keyword meta setting*
- [ ] Order by date
- [ ] Print date from metadata or filesystem meta with the item name
- [ ] Specify output filename
- [ ] Feature to drill down and generate links to other headings in doc, initially all top single `#` levels
## Completed