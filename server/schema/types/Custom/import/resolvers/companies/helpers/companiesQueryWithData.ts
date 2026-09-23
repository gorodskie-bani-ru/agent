import { PrismaContext } from 'server/context/interfaces'
import {
  bani684_site_content,
  bani684_site_tmplvar_contentvalues,
} from '../../../types'
import { TemplateVarIDs } from '../../../interfaces'

export type CompaniesQueryWithDataResult = {
  resource_address?: string
  resource_workTime?: string
  resource_pagetitle?: string
  resource_description?: string
  resource_properties?: string
  resource_gallery?: string

  resource_resource_id?: string
}

export function companiesQuery(this: PrismaContext['knex']) {
  const query = this.from<bani684_site_content>(
    'bani684_site_content as resource',
  )
    .leftJoin('Company as company', 'company.id', 'resource.companyId')
    .where({
      template: 27,
      // deleted: false,
      // published: true,
      // hidemenu: false,
    })

  return query
}

export function companiesQueryWithData(this: PrismaContext['knex']) {
  const query = companiesQuery
    .call(this)
    .leftJoin<bani684_site_tmplvar_contentvalues>(
      'bani684_site_tmplvar_contentvalues as tvs_image',
      {
        'tvs_image.tmplvarid': TemplateVarIDs.image,
        'tvs_image.contentid': 'resource.id',
      },
    )
    .select('tvs_image.id as resource_image_id')
    .select('tvs_image.value as resource_image')

    /**
     * Галерея компании
     */
    .leftJoin<bani684_site_tmplvar_contentvalues>(
      'bani684_site_tmplvar_contentvalues as tvs_gallery',
      {
        'tvs_gallery.tmplvarid': TemplateVarIDs.gallery,
        'tvs_gallery.contentid': 'resource.id',
      },
    )
    .select('tvs_gallery.id as resource_gallery_id')
    .select('tvs_gallery.value as resource_gallery')

    /**
     * Координаты
     */
    .leftJoin<bani684_site_tmplvar_contentvalues>(
      'bani684_site_tmplvar_contentvalues as tvs_coords',
      {
        'tvs_coords.tmplvarid': TemplateVarIDs.coords,
        'tvs_coords.contentid': 'resource.id',
      },
    )
    .select('tvs_coords.id as resource_coords_id')
    .select('tvs_coords.value as resource_coords')

    /**
     * Адрес
     */
    .leftJoin<bani684_site_tmplvar_contentvalues>(
      'bani684_site_tmplvar_contentvalues as tvs_address',
      {
        'tvs_address.tmplvarid': TemplateVarIDs.address,
        'tvs_address.contentid': 'resource.id',
      },
    )
    .select('tvs_address.id as resource_address_id')
    .select('tvs_address.value as resource_address')

    /**
     * Рабочее время
     */
    .leftJoin<bani684_site_tmplvar_contentvalues>(
      'bani684_site_tmplvar_contentvalues as tvs_workTime',
      {
        'tvs_workTime.tmplvarid': TemplateVarIDs.workTime,
        'tvs_workTime.contentid': 'resource.id',
      },
    )
    .select('tvs_workTime.id as resource_workTime_id')
    .select('tvs_workTime.value as resource_workTime')

    .leftJoin(
      // @ts-expect-error types
      function (this: PrismaContext['knex']) {
        return (
          this.from('bani684_society_votes')
            .avg({
              voteValueAvg: 'vote_value',
            })
            /**
             * Получаемые поля
             */
            .select('target_id')

            // Только рейтинги по компаниям
            .whereNotNull('type')
            // Только со ссылкой на компанию
            .whereNotNull('target_id')

            .groupBy('target_id')

            .as('votes')
        )
      },
      'votes.target_id',
      '=',
      'resource.id',
    )

    .select({
      resource_id: 'resource.id',
      // resource_resource_id: 'resource.resourceId',
      resource_uri: 'resource.uri',
      resource_pagetitle: 'resource.pagetitle',
      resource_createdby: 'resource.createdby',
      resource_createdon: 'resource.createdon',
      resource_description: 'resource.description',
      resource_longtitle: 'resource.longtitle',
      resource_published: 'resource.published',
      resource_searchable: 'resource.searchable',
      resource_template: 'resource.template',
      // resource_properties: 'resource.properties',
      VotesAvg: 'votes.voteValueAvg',
    })

  return query
}
