/** Get all information about document according id */
import { TSortOptionsQuery } from "../../types";
import { SortDirection, arrayOfStringsToString, isObjectEmpty } from "../../utils";
import { TUploadFileObject } from "../api";
import { IGraphQlFilter, graphQlFilter } from "../filters";

const documentAllItems = `
        id
        guid        
        fileName
        fileId
         accesses {
           access {
             id
             accessName
           }
         }
        label
        name
        documentFormatType
        writtenForm {
          writtenFormType
        }
        owner {
          id
          name
        }
        series {
          id
          name
        }
        dateOfEfficiency
        dateOfApproval
        referenceNumber
        accessLevel
        onTheWeb
        gestorDepartment {
          id
          department
        }
        gestor {
          id
          name
        }
        recordTypeId
        documentType {
          id
          type
        }
        areaOfAdjustment {
          id
          area
        }
        writtenForm {
          id
          writtenFormType
        }
        changes
        annotation
        dateOfPublish
        dateInNews
        stateCode {
          id
          code
        }
        infrastructureJunction {
          id
          name
        }
        note
        oldNote
        dateOfCancellation
        inArchive
        dateOfArchiving
        documentStatus
        relationships {
          id
          type
          relatedDocument {
            label
            id
          }
        }
`;

const documentNewsTablePage = `
  items {
        guid
        fileId        
        owner {
          id
          name
        }
        series {
          id
          name
        }       
        label
        name
        dateOfEfficiency
        accessLevel
        dateOfPublish
      }
`;

const relationshipsTotalCount = (guid: string | null): string => {
  // If not documentId, return empty string
  if (!guid) {
    return "";
  }

  // If documentId is string, convert to number
  // const id = typeof documentId === "string" ? parseInt(documentId) : documentId;

  // Return query
  return `
    relationshipsByPrimaryDocumentGuid(guid: "${guid}") {
      totalCount
    }
  `;
};

export const documentDetailPageQuery = (guid: string | null, documentId: string | number | null) => `
  query {
    
    edapDocumentByGuid(guid: "${guid}") {
      ${documentAllItems}
    }
    
    ${relationshipsTotalCount(guid)}
    
    edapAccessTableByGuid(guid: "${guid}") {
      id
      access {
        accessName
      }
    }
  }
`;


export const documentDetailbyGuidQuery = (guid: string | null) => `
  query {    
    edapDocumentByGuid(guid: "${guid}") {
      ${documentAllItems}
    }
  }
`;


/** Get attachment file */
export const attachmentFileQuery = (id: string | null) => `
  query {
    attachmentById (id: ${id}) {
      name
      file
    } 
  }
`;

/** Save new document */
export const addEdapDocumentMutation = `
  mutation ($edapDocument: EdapInput!) {
    addEdapDocument(input: $edapDocument) {
      id, guid
    }
  }
`;

export const updateCommonFileMutation = `mutation ($CommonFileUpdateInput: CommonFileUpdateInput!) {
  updateCommonFile(input: $CommonFileUpdateInput) {
    id,
      fileName,
      description,
      fileGroup,
      title
  }
}`;

/** Delete document */
export const deleteEdapDocumentMutation = `
  mutation ($guid: UUID!) {
    deleteEdapDocumentByGuid(guid: $guid) {
      guid
    }
  }
`;

export const changeEdapDocumentMutation = `
  mutation ($edapDocument: EdapInput!) {
    changeEdapDocument(input: $edapDocument) {
      id, guid
    }
  }
`;

export const addDocumentAccessMutation = `
  mutation ($access: EdapAccessInput!) {
    addEdapAccessTable(input: $access) {
      id
    }
  }
`;

export const documentHistoryTileByGuidsQuery = (guids: string[], take?: number) => `
  query {
    edapDocuments(${take ? `take: ${take}, ` : ""}where:  { guid: { in: ${arrayOfStringsToString(guids)} } } ) {
      totalCount
      items {
        id
        guid
        label
        name
        documentFormatType
        dateOfEfficiency
        dateOfPublish
        dateOfCancellation
        dateOfArchiving
      }
    }
  }
`;

export const uploadFileQueryObjectMutation = (documentId: number): TUploadFileObject => ({
  query: {
    query: `
        mutation($input: UploadFileInput!) {
          uploadEdapDocument(input: $input) {
            edapId
            guid
            name
          }
        }
      `,
    variables: {
      input: {
        edapId: documentId,
        file: null,
      },
    },
  },
  map: {
    "0": ["variables.input.file"],
  },
});

export const uploadAttachmentFileObjectMutation = (documentId: number): TUploadFileObject => ({
  query: {
    query: `
      mutation($input: AttachmentInput!) {
        addAttachmentFile(input: $input) {
          id
          edapId
          name
        }
      }
    `,
    variables: {
      input: {
        edapId: documentId,
        file: null,
      },
    },
  },
  map: {
    "0": ["variables.input.file"],
  },
});

export const deleteAttachmentFileObjectMutation = (documentId: number): TUploadFileObject => ({
  query: {
    query: `
      mutation($input: AttachmentInput!) {
        deleteAttachmentFile(input: $input) {
          id
          edapId
          name
        }
      }
    `,
    variables: {
      input: {
        edapId: documentId,
        file: null,
      },
    },
  },
  map: {
    "0": ["variables.input.file"],
  },
});

export type TOrder = {
  by?: string,
  direction?: SortDirection,
}

export type TWhereFilter = {
  by?: string,
  filter?: object,
}

export const editDocumentPageQuery = (guid: string) => `
  query {
    edapDocumentByGuid(guid:"${guid}") {
      ${documentAllItems}
    }
    
    relationshipsByPrimaryDocumentGuid (guid: "${guid}") {
      items {
        type
        relatedDocument {
          id
          fileId
          guid
          label
          name
          dateOfEfficiency
          referenceNumber
        }         
      }
    }   
        
    attachmentByEdapGuid (guid: "${guid}") {
      id
      name
      documentFormatType
    }
  }
`;

export type TEdapDocumentsWithFilter = {
  order?: TOrder,
  where?: TWhereFilter,
}

export type TQueryWithFilter = string | ((filters: TEdapDocumentsWithFilter) => string) | any;

export const attachmentsQuery = (guid: string): string => `
  query {
      attachmentByEdapGuid (guid: "${guid}") {
      id
      name
      documentFormatType
      guid
    }
  }
`;

export const edapNewsDocumentsWithFilter = (filter: IGraphQlFilter): string => `
    query {
      newsDocuments(
       ${graphQlFilter({
    ...filter,
    where: {
      ...filter.where,
    },
  })}
      ) {
        totalCount
        ${documentNewsTablePage}
      }
    }
  `;

export const addRelationshipMutation = `
  mutation($input: RelationshipInput!) {
    addRelationship(input: $input) {
      id
    }
  }
`;

export const deleteRelationshipMutation = `
  mutation($id: UnsignedInt!) {
    deleteRelationship(id: $id) {
      id
    }
  }
`;

export const relatedDocumentsMutation = (guid: string, documentsTotalCount: number) => `
query {
  relationshipsByPrimaryDocumentGuid(guid: "${guid}", take: ${documentsTotalCount}) {  
    totalCount
    items {
      relatedDocument {
        id
        label
        inArchive
        guid
        name
        dateOfEfficiency
        dateOfPublish
        dateOfArchiving
        dateOfCancellation
        documentFormatType
      }
      type
    }
  }
}
`;

const documentValidTablePage = `
items {
        guid
        fileId
        owner {
            id
            name
        }
        series {
            id
            name
        }
        label
        name
        dateOfEfficiency
        accessLevel
        areaOfAdjustment {
            id
            area
        }
        dateOfPublish
        gestor {
            id
            name
        }
       }
    `;

const documentArchiveTablePage = `
  items {
          guid
          fileId
          owner {
            id
            name
          }
          series {
            id
            name
          }
          label
          name
          areaOfAdjustment {
            id
            area
          }
          gestorDepartment {
            id
            department
          }
          accessLevel
          dateOfEfficiency
          dateOfCancellation
          dateOfArchiving
        }
    `;

export const edapDocumentsValidWithFilter = (filter: IGraphQlFilter): string => `
    query {
        validDocuments(
        ${graphQlFilter({
    ...filter,
    where: {
      ...filter.where,
    },
  })}) {
        totalCount
        ${documentValidTablePage}
      }
    }
`;

export const edapDocumentsConceptWithFilter = (filter: IGraphQlFilter): string => `
    query {
      edapDocumentConcepts(
        ${graphQlFilter({
    ...filter,
    where: {
      ...filter.where,
    },
  })}) {
        totalCount
        ${documentValidTablePage}
      }
    }
`;

export const edapArchivedDocuments = (filter: IGraphQlFilter): string => `
  query {
    archiveDocuments(${graphQlFilter({
    ...filter,
    where: {
      ...filter.where,
    },
  })}) {
      totalCount
      ${documentArchiveTablePage}
    }
  }
`;

/**
 * Fetch new documents in eDAP. It has fixed date in development mode for fixing data during hacking.
 * @param {number} take -  number of fetched items.
 * @param {SortDirection} sortDirection - order of direction
 * @param {ListOfDocumentsSortOrderBy} orderBy - order request by
 * @param { number } skip - how many items will be skipped.
 * @param where
 * @returns {string} - query
 */
export const edapQuery = ({ take, sortDirection, orderBy, skip, where }: TSortOptionsQuery) =>
  `query {    
    edapDocuments(      
    take: ${take},
    skip: ${skip},
    where: ${where},
    order: { ${orderBy}: ${sortDirection} }
    ) {
      totalCount
      items {
        id
        guid
        label
        name
        documentFormatType 
        dateOfEfficiency
        dateOfPublish
        dateOfArchiving
        dateOfCancellation 
        accessLevel 
      }
    }
  }`;

export const edapConceptQuery = ({ take, sortDirection, orderBy, skip, where }: TSortOptionsQuery) =>
  `query {    
    edapDocumentConcepts(
    take: ${take},
    skip: ${skip},
    where: ${where},
    order: { ${orderBy}: ${sortDirection} }
    ) {
      totalCount
      items {
        id
        guid
        label
        name
        documentFormatType 
        dateOfEfficiency
        dateOfPublish
        dateOfArchiving
        dateOfCancellation 
        accessLevel 
      }
    }
  }`;

// "803d4ff9-6591-b101-e053-020012ac5403"
export const edapDocumentHistoryByGuid = (guid: string) =>
  ({ take, sortDirection, orderBy, skip, where }: TSortOptionsQuery) => `
  query{
    edapDocumentHistoryByGuid(guid: "${guid}",
     take: ${take},
     skip: ${skip},
     where: {},
     order: {}
     ) {
        totalCount
        items {
            author {
                firstname,
                lastname,
                titles
            }
            dateOfChange,
            oldValue,
            newValue,
            historyOperationType,
            fieldName
        }        
     }
  }
`;

