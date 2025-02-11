import { FastifyInstance, FastifyReply } from "fastify";
import { SetMassageDetailBodyRequest } from "../../../type/handler/massage";
import pool from "../../../util/postgres";

export const handleGetSetDetail = async (
  request: SetMassageDetailBodyRequest,
  reply: FastifyReply,
) => {
  try {
    const { ms_id } = request.body;
    const client = await pool.connect();
    const massageSetQuery = await client.query(
      `
        SELECT * FROM public."MassageSet"
        WHERE ms_id = $1;
      `,
      [ms_id]
    );

    if (massageSetQuery.rowCount == null || massageSetQuery.rowCount < 1) {
      return reply
        .status(404)
        .send({ error: "This Set Massage Technique is not exist !" });
    }

    const massageSetDetail = massageSetQuery.rows[0];
    const mt_ids = massageSetDetail.mt_ids;
    let massageTechniques = [];
    for (let mt_id of mt_ids) {
      const massageQuery = await client.query(
        `
        SELECT * FROM public."MassageTechnique"
        WHERE mt_id = $1;
      `,
        [mt_id]
      );
      massageTechniques.push(massageQuery.rows[0]);
    }

    client.release();

    massageSetDetail.massageTechniqueDetails = massageTechniques;

    return reply.status(200).send({
      message: "Fetch Set Massage Technique Successfully",
      data: massageSetDetail,
    });
  } catch (err) {
    return reply
      .status(500)
      .send({ error: err, message: "Can't Find Set Massage Technique" });
  }
};
