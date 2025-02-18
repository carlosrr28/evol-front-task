import { FC } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addTask } from "../services/task-slice.service";
import { Task } from "../interfaces/task.interface";
import { AppDispatch } from "../../store/store";

const TaskForm: FC = () => {

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    dueDate: Yup.date().required("La fecha de vencimiento es obligatoria").nullable(),
    tags: Yup.array().of(Yup.string().required("Cada etiqueta debe ser un texto válido")).min(1, "Debe agregar al menos una etiqueta"),
    completed: Yup.boolean().required("Debe especificar si la tarea está completada o no"),
  });
  
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: Task) => {
    dispatch(addTask(values));
  };

  return (
    <Formik
      initialValues={{
        id: 0,
        title: "",
        description: "",
        completed: false,
        tags: [],
        dueDate: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
  {({ setFieldValue }) => (
    
    <Form className="max-w-4xl mx-auto space-y-6 p-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Título</label>
          <Field
            type="text"
            name="title"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Descripción</label>
          <Field
            as="textarea"
            name="description"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
        </div>
      </div>

      {/* Fecha de Vencimiento y Estado de la Tarea */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Fecha de Vencimiento */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Fecha de Vencimiento</label>
          <Field
            type="date"
            name="dueDate"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm" />
        </div>

        {/* Estado de la Tarea */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Estado de la Tarea</label>
          <Field
            as="select"
            name="completed"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="false">No Completada</option>
            <option value="true">Completada</option>
          </Field>
          <ErrorMessage name="completed" component="div" className="text-red-500 text-sm" />
        </div>
      </div>

      {/* Etiquetas */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">Etiquetas (separadas por comas)</label>
        <Field
            type="text"
            name="tags"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const tags = e.target.value
                .split(",") 
                .map((tag) => tag.trim())
                .filter((tag) => tag);

                setFieldValue("tags", tags);
            }}
        />
        <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Agregar Tarea
        </button>
      </div>
    </Form>
  )}
</Formik>

  );
};

export default TaskForm;
