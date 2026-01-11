'use server';

import { z } from 'zod';
import { translations } from './translations';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    // This example doesn't show errors on form, but in a real app you would.
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      message: 'There was an error with your submission.',
    };
  }

  // In a real app, you would process this data (e.g., send an email, save to DB).
  console.log('Contact form submitted:', validatedFields.data);

  // For this demo, we'll just return a success message.
  // In a real multi-language app, you'd detect the user's language.
  return { message: translations.en.contact.formSuccess };
}
