# Template-Specific Editor Routes

## Overview
The resume editor now supports template-specific routes that lock the editor to a specific template type with customized form sections and profile fields.

## Routes
| Route | Template | Description |
|-------|----------|-------------|
| `/editor/technical` | tech | For developers, engineers |
| `/editor/professional` | professional | For general business roles |
| `/editor/medical` | medical | For healthcare professionals |
| `/editor/creative` | creative | For designers and artists |

## Architecture

### Template Configuration (`lib/template-configs.ts`)
Each template has a configuration object:
```typescript
interface TemplateConfig {
  id: TemplateType;
  name: string;
  sections: { ... };        // Which sections to show/hide
  profileFields: [];        // Custom profile link fields
  placeholderData: {};      // Template-specific placeholder
}
```

### Route Handling (`App.tsx`)
```tsx
<Route path="/editor/:templateId" element={<TemplateEditorWrapper />} />
```

### EditorPage Integration
- Receives `lockedTemplate` prop from route
- Sets template on mount via `useEffect`
- Hides template selector when locked
- Passes `templateConfig` to ResumeForm

## Related Files
- [template-configs.ts](file:///c:/Users/Adnan%20Shahria/Desktop/Resume-Builder-Test/apps/web/src/lib/template-configs.ts)
- [App.tsx](file:///c:/Users/Adnan%20Shahria/Desktop/Resume-Builder-Test/apps/web/src/App.tsx)
- [EditorPage.tsx](file:///c:/Users/Adnan%20Shahria/Desktop/Resume-Builder-Test/apps/web/src/pages/EditorPage.tsx)
- [TemplatesPage.tsx](file:///c:/Users/Adnan%20Shahria/Desktop/Resume-Builder-Test/apps/web/src/pages/TemplatesPage.tsx)
