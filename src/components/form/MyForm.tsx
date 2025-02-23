// import {
//   FieldValues,
//   FormProvider,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";
// import { TFormConfig, TFromProps } from "../../types/formProps";

// const MyForm = ({
//   children,
//   onSubmit,
//   resolver,
//   defaultValues,
// }: TFromProps) => {
//   const formConfig: TFormConfig = {};
//   if (defaultValues) {
//     formConfig["defaultValues"] = defaultValues;
//   }

//   if (resolver) {
//     formConfig["resolver"] = resolver;
//   }
//   const methods = useForm(formConfig);

//   const submit: SubmitHandler<FieldValues> = (data) => {
//     onSubmit(data);
//     methods.reset();
//   };
//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
//     </FormProvider>
//   );
// };

// export default MyForm;
