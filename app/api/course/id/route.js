import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";

export async function GET(request, res) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams.get("foo");
    const users = await query({
      query: `SELECT * from course where  course_id=${params}`,
      values: [],
    });
    const image_course = await query({
      query: `SELECT * from image_course where  course_id=${params}`,
      values: [],
    });
    const course_topic = await query({
      query: `SELECT * from course_topic where  course_id=${params}`,
      values: [],
    });
    const course_objective = await query({
      query: `SELECT * from course_objective where  course_id=${params}`,
      values: [],
    });
    const data = {
      status: 200,
      data: users,
      image_course: image_course,
      course_topic: course_topic,
      course_objective: course_objective,
    };
    return NextResponse.json(data);
  } catch (error) {
    const data = {
      status: 400,
      data: error.message,
    };
    return NextResponse.json(data);
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      course_id,
      course_name,
      course_name_en,
      course_gen,
      course_expensesonline,
      course_expensesonsite,
      course_lecturer,
      course_enroll,
      course_start,
      course_end,
      course_point,
      course_objective, // Array of objectives
      course_topic, // Array of topics
    } = body;

    // Update `course` table
    await query({
      query: `
        UPDATE course SET 
          course_name = ?,
          course_name_en = ?,
          course_gen = ?,
          course_expensesonline = ?,
          course_expensesonsite = ?,
          course_lecturer = ?,
          course_enroll = ?,
          course_start = ?,
          course_end = ?,
          course_point = ?
        WHERE course_id = ?
      `,
      values: [
        course_name,
        course_name_en,
        course_gen,
        course_expensesonline,
        course_expensesonsite,
        course_lecturer,
        course_enroll,
        course_start,
        course_end,
        course_point,
        course_id,
      ],
    });

    // Update `course_objective` table
    if (course_objective && Array.isArray(course_objective)) {
      for (const objective of course_objective) {
        const {
          course_objective_id,
          course_objective_name,
          course_objective_name_eng,
        } = objective;

        if (course_objective_id) {
          // Update existing objective
          await query({
            query: `
              UPDATE course_objective SET
                course_objective_name = ?,
                course_objective_name_eng = ?
              WHERE course_objective_id = ?
            `,
            values: [
              course_objective_name,
              course_objective_name_eng,
              course_objective_id,
            ],
          });
        } else {
          // Insert new objective
          await query({
            query: `
              INSERT INTO course_objective (course_objective_name, course_objective_name_eng, course_id)
              VALUES (?, ?, ?)
            `,
            values: [
              course_objective_name,
              course_objective_name_eng,
              course_id,
            ],
          });
        }
      }
    }

    // Update `course_topic` table
    if (course_topic && Array.isArray(course_topic)) {
      for (const topic of course_topic) {
        const { course_topic_id, course_topic_name, course_topic_name_eng } =
          topic;

        if (course_topic_id) {
          // Update existing topic
          await query({
            query: `
              UPDATE course_topic SET
                course_topic_name = ?,
                course_topic_name_eng = ?
              WHERE course_topic_id = ?
            `,
            values: [course_topic_name, course_topic_name_eng, course_topic_id],
          });
        } else {
          // Insert new topic
          await query({
            query: `
              INSERT INTO course_topic (course_topic_name, course_topic_name_eng, course_id)
              VALUES (?, ?, ?)
            `,
            values: [course_topic_name, course_topic_name_eng, course_id],
          });
        }
      }
    }

    return NextResponse.json({
      status: 200,
      message: "Data updated successfully",
    });
  } catch (error) {
    console.error("Error updating course:", error.message);
    return NextResponse.json({ status: 400, error: error.message });
  }
}
export const dynamic = "force-dynamic";
