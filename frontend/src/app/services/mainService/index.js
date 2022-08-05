import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const sPointAPI = createApi({
  reducerPath: 'sPoint',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/' }),
  tagTypes: ['Class', 'Teacher', 'Student'],
  endpoints: (builder) => ({
    //class
    getClasses: builder.query({ query: () => 'class', providesTags:['Class'] }),
    getClassById: builder.query({ query: (id) => `/class/${id}`, providesTags: ["Class"], }),
    addClasses: builder.mutation({
      query: (classes) => {
        return { url: '/class', method: 'POST', body: classes }
      },
      invalidatesTags: ['Class']
    }),
    updateClass: builder.mutation({
      query: ({ id, ...rest }) => {
        return { url: `/class/${id}`, method: "PUT", body: {name:rest.name, homeroom_teachers: rest.homeroom_teachers}  }},
      invalidatesTags: ["Class"],
    }),
    deleteClass: builder.mutation({
      query: (id) => ({ url: `/class/${id}`, method: "DELETE", }),
      invalidatesTags: ["Class"],
    }),
    
    //teacher
    getTeachers: builder.query({ query: () => 'teacher', providesTags:['Teacher'] }),
    getTeacherById: builder.query({ query: (id) => `/teacher/${id}`, providesTags: ["Teacher"], }),
    addTeachers: builder.mutation({
      query: (teachers) => ({ url: '/teacher', method: 'POST', body: teachers }),
      invalidatesTags: ['Teacher']
    }),
    updateTeacher: builder.mutation({
      query: ({ id, ...rest }) => ({ url: `/teacher/${id}`, method: "PUT", body: rest, }),
      invalidatesTags: ["Teacher"],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({ url: `/teacher/${id}`, method: "DELETE", }),
      invalidatesTags: ["Teacher"],
    }),

    //students
    getStudents: builder.query({ query: () => 'student', providesTags:['Student'] }),
    getStudentById: builder.query({ query: (id) => `/student/${id}`, providesTags: ["Student"], }),
    addStudents: builder.mutation({
      query: (students) => ({ url: '/student', method: 'POST', body: students }),
      invalidatesTags: ['Student']
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...rest }) => ({ url: `/student/${id}`, method: "PUT", body: rest, }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({ url: `/student/${id}`, method: "DELETE", }),
      invalidatesTags: ["Student"],
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetClassesQuery, useGetClassByIdQuery, useAddClassesMutation, useUpdateClassMutation, useDeleteClassMutation } = sPointAPI
export const { useGetTeachersQuery, useGetTeacherByIdQuery, useAddTeachersMutation, useUpdateTeacherMutation, useDeleteTeacherMutation } = sPointAPI