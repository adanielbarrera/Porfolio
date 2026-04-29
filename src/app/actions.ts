"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Por favor, rellena todos los campos." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['angelodanielo24@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #00311f;">Nuevo mensaje desde tu portafolio</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return { error: "Hubo un error al enviar el mensaje. Inténtalo de nuevo." };
    }

    return { success: "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto." };
  } catch (error) {
    console.error("Error en sendEmail:", error);
    return { error: "Hubo un error crítico al enviar el mensaje." };
  }
}
