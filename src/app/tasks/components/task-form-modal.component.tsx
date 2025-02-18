import { FC } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addTask, updateTask } from "../services/task-slice.service";
import { Task } from "../interfaces/task.interface";
import { AppDispatch } from "../../store/store";
import { ArrowBigLeft, Save } from "lucide-react";
import { RiCheckboxBlankCircleFill, RiCheckboxCircleFill } from "react-icons/ri"; // Iconos para "No Completada" y "Completada"

interface TaskFormModalProps {
  task: Task;
  onClose: () => void;
}

const TaskFormModal: FC<TaskFormModalProps> = ({ task, onClose }) => {
  const initialValue = {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    tags: task.tags,
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    dueDate: Yup.date().required("La fecha de vencimiento es obligatoria").nullable(),
    tags: Yup.array().of(Yup.string().required("Cada etiqueta debe ser un texto válido")).min(1, "Debe agregar al menos una etiqueta"),
    completed: Yup.boolean().required("Debe especificar si la tarea está completada o no"),
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: Task) => {

    console.log(task.id);

    if(task.id >= 0){
      dispatch(updateTask(values));
    }
    else {
      dispatch(addTask(values));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-0.5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-180">
      { task.id < 0 && (
          <h1 className="text-3xl font-bold text-center mb-6 mt-6">Crea una nueva tarea</h1>
        ) }
        { task.id >= 0 && (
          <h1 className="text-3xl font-bold text-center mb-6 mt-6">Actualizar tarea</h1>
        ) }

        <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form className="max-w-4xl mx-auto space-y-6 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Título */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Título</label>
                  <Field type="text" name="title" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Descripción</label>
                  <Field as="textarea" name="description" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Fecha de Vencimiento y Estado de la Tarea */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Fecha de Vencimiento */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Fecha de Vencimiento</label>
                  <Field type="date" name="dueDate" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                  <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Estado de la Tarea */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Estado de la Tarea</label>
                  <div className="flex items-center space-x-4">
                    {/* Solo mostrar el ícono correspondiente */}
                    {values.completed ? (
                      <div
                        className="cursor-pointer text-blue-600"
                        onClick={() => setFieldValue("completed", false)}
                      >
                        <RiCheckboxCircleFill size={30} />
                        <span>Completada</span>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer text-blue-600"
                        onClick={() => setFieldValue("completed", true)}
                      >
                        <RiCheckboxBlankCircleFill size={30} />
                        <span>No Completada</span>
                      </div>
                    )}
                  </div>
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

              <div className="flex justify-center space-x-4">
                <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center">
                  <ArrowBigLeft className="mr-2" />
                  Cancelar
                </button>

                <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 flex items-center">
                  <Save className="mr-2" />
                  Guardar edición
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskFormModal;
