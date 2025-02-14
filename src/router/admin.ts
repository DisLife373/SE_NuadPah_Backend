import { FastifyInstance, FastifyReply } from "fastify";
import {
  AddSingleMassageBodyRequest,
  AddSetMassageBodyRequest,
  EditSingleMassageBodyRequest,
  EditSetMassageBodyRequest,
  EditUserBodyRequest,
  DeleteUserParamsRequest,
  UpdateReportStatusBodyRequest,
} from "../type/handler/admin";
import { handleAddSingleMassage } from "../handler/admin/MassageManagement/handleAddSingleMassage";
import { handleAddSetMassage } from "../handler/admin/MassageManagement/handleAddSetMassage";
import { handleEditSingleMassage } from "../handler/admin/MassageManagement/handleEditSingleMassage";
import { handleEditSetMassage } from "../handler/admin/MassageManagement/handleEditSetMassage";
import { handleDeleteSingleMassage } from "../handler/admin/MassageManagement/handleDeleteSingleMassage";
import { handleDeleteSetMassage } from "../handler/admin/MassageManagement/handleDeleteSetMassage";
import { handleGetUserList } from "../handler/admin/UserManagement/handleGetUserList";
import { handleUserEdit } from "../handler/admin/UserManagement/handleUserEdit";
import { handleUserDelete } from "../handler/admin/UserManagement/handleUserDelete";
import { handleUpdateReportStatus } from "../handler/admin/ReportManagement/handleUpdateReportStatus";

const adminRouter = async (app: FastifyInstance) => {
  // Massage Technique Management ////////////////////////////////////////////////////////////////

  // Add Single Massage Technique
  app.post(
    "/add-single-massage",
    async (request: AddSingleMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleAddSingleMassage(request, reply);
      reply.send(result);
    }
  );

  // Edit Single Massage Technique
  app.put(
    "/edit-single-massage/:mt_id",
    async (request: EditSingleMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleEditSingleMassage(request, reply);
      reply.send(result);
    }
  );

  // Delete Single Massage Technique
  app.delete(
    "/delete-single-massage/:mt_id",
    async (request: EditSingleMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleDeleteSingleMassage(request, reply);
      reply.send(result);
    }
  );

  // Add Set Massage Technique
  app.post(
    "/add-set-massage",
    async (request: AddSetMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleAddSetMassage(request, reply);
      reply.send(result);
    }
  );

  // Edit Set Massage Technique
  app.put(
    "/edit-set-massage/:ms_id",
    async (request: EditSetMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleEditSetMassage(request, reply);
      reply.send(result);
    }
  );

  // Delete Set Massage Technique
  app.delete(
    "/delete-set-massage/:ms_id",
    async (request: EditSetMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleDeleteSetMassage(request, reply);
      reply.send(result);
    }
  );
  ////////////////////////////////////////////////////////////////////////////////////////////////

  // User Management /////////////////////////////////////////////////////////////////////////////

  // Get User List
  app.get(
    "/get-users",
    async (request: any, reply: FastifyReply) => {
      const result = await handleGetUserList(reply);
      reply.send(result);
    }
  );

  // Edit User Information
  app.put(
    "/edit-user/:id",
    async (request: EditUserBodyRequest, reply: FastifyReply) => {
      const result = await handleUserEdit(request, reply);
      reply.send(result);
    }
  );

  // Delete User Account
  app.delete(
    "/delete-user/:id",
    async (request: DeleteUserParamsRequest, reply: FastifyReply) => {
      const result = await handleUserDelete(request, reply);
      reply.send(result);
    }
  );
  ////////////////////////////////////////////////////////////////////////////////////////////////

  // Report Management ///////////////////////////////////////////////////////////////////////////
  app.put(
    "/update-report-status/:rep_id",
    async (request: UpdateReportStatusBodyRequest, reply: FastifyReply) => {
      const result = await handleUpdateReportStatus(request, reply);
      reply.send(result);
    }
  );
  ////////////////////////////////////////////////////////////////////////////////////////////////
};

export default adminRouter;
