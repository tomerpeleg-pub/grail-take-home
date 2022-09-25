## Grail Take Home interview Tomer Peleg

## Running

Run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run the unit tests:

```bash
# Run in watch mode
yarn test
# Run in CI mode
yarn test:ci
```

## Incomplete Changes

I ran out of time. This is what I would do given a few more hours:

- Finish adding unit tests for the rest of the components and utils. (only Pagination.spec.js is there for now)
- Move all state logic into a state manager, e.g. redux or mobx.
- Replace seperate CRUD endpoints (create, delete, update) with a single /participant endpoint and use the request method to determine the desired task. (I created it this way initially for simplicity)
- Add loading and error states
- Add validation for the form inputs
- Add E2E/Behavioural test.
- Add functionality for searching by specific field.
- Add sorting by field.
- Fix html semantics, add correct aria fields and functionality
- Mobile styling for the table

## Design Choices

- I went with Next.js as a base as it provides nice defaults out of the box, so I wouldn't have to spend as much time setting up the project. I don't think it is a bad choice for a project like this, but it is likely unecessary given the simplicity of the task.
- The task stated not to build an API for this, though in the end I chose to build a very simple one anyway on top of some mock data. In order to get the basic behaviour functioning correctly (the CRUD methods) I would need to implement most of the logic for it anyway, and doing it this way is cleaner for an MVP I think.
- Originally I intended to create the UI components myself, but I ran out of time so I added Material-ui instead. Without a design this isn't necessarily bad, but it isn't what I would choose in most cases.
