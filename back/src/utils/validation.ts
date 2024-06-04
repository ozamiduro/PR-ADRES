import { validate } from "class-validator";

export const handleValidation = async (object: object): Promise<void> => {
  const errors = await validate(object, { validationError: { target: false } });
  if (errors.length > 0) {
    const errorText = errors
      .map((err) => Object.values(err.constraints as object))
      .join("\n");
    throw new Error(
      `Occurio un problema en tu solicitud debido a:\n ${errorText}`
    );
  }
};
