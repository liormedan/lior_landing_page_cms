# Unit Tests for Sales Landing Page Components

This directory contains comprehensive unit tests for the main components of the sales landing page, covering all the requirements specified in task 16.

## Test Coverage

### 1. Contact Form Tests (`test/components/contact-form.test.tsx`)
- **Form Rendering**: Validates all form fields are rendered correctly
- **Validation Logic**: Tests client-side validation for all required fields
- **Email Format Validation**: Ensures proper email format checking
- **Field Length Validation**: Tests minimum length requirements for name and message
- **Error Handling**: Tests both network errors and validation errors
- **Form Submission**: Tests successful form submission with proper API calls
- **State Management**: Tests form reset and success states
- **Props Handling**: Tests selectedPackage prop and onClose callback

**Requirements Covered**: 4.4 (Form validation and submission)

### 2. FAQ Section Tests (`test/components/faq-section.test.tsx`)
- **Accordion Functionality**: Tests expand/collapse behavior
- **Multiple Items**: Ensures multiple FAQ items can be open simultaneously
- **Accessibility**: Tests ARIA attributes and keyboard navigation
- **Content Organization**: Tests category grouping and display
- **Animation States**: Tests CSS classes for collapsed/expanded states
- **Contact CTA**: Tests the additional contact section

**Requirements Covered**: 5.2 (FAQ accordion functionality)

### 3. Pricing Section Tests (`test/components/pricing-section.test.tsx`)
- **Package Display**: Tests rendering of all pricing packages
- **Highlighted Package**: Tests visual highlighting of recommended package
- **Feature Lists**: Tests display of package features
- **Modal Interaction**: Tests contact form modal opening/closing
- **Package Selection**: Tests package selection and passing to contact form
- **Styling**: Tests different styling for highlighted vs regular packages
- **Additional Info**: Tests guarantee and included features sections

**Requirements Covered**: 9.1 (Pricing section interactions)

### 4. Recent Posts Tests (`test/components/recent-posts.test.tsx`)
- **Content Display**: Tests rendering of post cards
- **Navigation**: Tests "View All Posts" button and link
- **Accessibility**: Tests proper ARIA labels and semantic HTML
- **Responsive Grid**: Tests grid layout classes
- **Empty States**: Tests handling of empty or null post arrays
- **Styling**: Tests responsive design classes

**Requirements Covered**: 7.1 (Recent posts component functionality)

### 5. Responsive Behavior Tests (`test/utils/responsive.test.tsx`)
- **Viewport Simulation**: Tests different screen sizes (mobile, tablet, desktop)
- **CSS Classes**: Tests responsive Tailwind classes are applied correctly
- **Touch Interactions**: Tests touch-friendly button sizes on mobile
- **Grid Layouts**: Tests responsive grid behavior across components
- **Spacing**: Tests proper spacing adjustments for different screen sizes

**Requirements Covered**: 10.1 (Responsive behavior across all components)

## Test Setup

### Configuration Files
- `vitest.config.ts`: Vitest configuration with React plugin and path aliases
- `test/setup.ts`: Global test setup with mocks for Next.js components and browser APIs

### Mocks
- **Next.js Router**: Mocked for navigation testing
- **Next.js Link**: Mocked for link component testing
- **Intersection Observer**: Mocked for scroll animation testing
- **Window.matchMedia**: Mocked for responsive testing
- **Fetch API**: Mocked for form submission testing

### Dependencies
- **Vitest**: Modern test runner with great TypeScript support
- **React Testing Library**: Component testing utilities
- **User Event**: User interaction simulation
- **JSDOM**: Browser environment simulation

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Test Philosophy

These tests follow the Testing Library philosophy of testing components as users would interact with them:

1. **User-Centric**: Tests focus on user interactions rather than implementation details
2. **Accessibility-First**: Tests ensure proper ARIA attributes and semantic HTML
3. **Integration-Style**: Tests components with their dependencies when possible
4. **Realistic Scenarios**: Tests cover real user workflows and edge cases

## Coverage Summary

- ✅ Contact Form validation and submission
- ✅ FAQ accordion functionality  
- ✅ Pricing section interactions
- ✅ Recent Posts component rendering
- ✅ Responsive behavior across all components
- ✅ Accessibility compliance
- ✅ Error handling and edge cases
- ✅ User interaction flows

All tests pass and provide comprehensive coverage of the main landing page components as required by the specification.