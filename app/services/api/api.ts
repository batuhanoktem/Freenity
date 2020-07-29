import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { UserSnapshot } from "../../models/user"
import { LoginSnapshot } from "../../models/login"
import { MessageSnapshot } from "../../models/message"
import { AuthorModel } from "../../models/author"
import { FileSnapshot, FileModel } from "../../models/file"
import { MessageRequestSnapshot } from "../../models/message-request"
import { DocumentPickerResponse } from "react-native-document-picker"
import { UploadResponse, UploadResponseSnapshot } from "../../models/upload-response"
import { ImagePickerResponse } from "react-native-image-picker"
const { URL } = require("../../config/env")

const convertMessage = (raw: any): MessageSnapshot => {
  let author = null

  if (raw.author !== undefined) {
    author = AuthorModel.create({
      name: raw.author.name,
      url: raw.author.url,
    })
  }

  let files: FileSnapshot[] = []

  if (raw.files !== null) {
    raw.files.forEach(file => {
      let url: string = file.url
      let preview: string = file.preview

      if (!url.includes("http")) url = `${URL}/${file.url}`
      if (!preview.includes("http")) preview = `${URL}/${file.preview}`

      files.push(
        FileModel.create({
          type: file.type,
          name: file.name,
          url: url,
          preview: preview,
        }),
      )
    })
  }

  return {
    _id: raw._id,
    user_id: raw.user_id,
    __v: raw.__v,
    attached: raw.attached,
    updated_at: Date.parse(raw.updated_at),
    created_at: Date.parse(raw.created_at),
    date: raw.date,
    article_zu: raw.article_zu,
    article_zh: raw.article_zh,
    article_yo: raw.article_yo,
    article_yi: raw.article_yi,
    article_xh: raw.article_xh,
    article_vi: raw.article_vi,
    article_uz: raw.article_uz,
    article_ur: raw.article_ur,
    article_uk: raw.article_uk,
    article_tr: raw.article_tr,
    article_tl: raw.article_tl,
    article_th: raw.article_th,
    article_tg: raw.article_tg,
    article_te: raw.article_te,
    article_ta: raw.article_ta,
    article_sw: raw.article_sw,
    article_sv: raw.article_sv,
    article_su: raw.article_su,
    article_st: raw.article_st,
    article_sr: raw.article_sr,
    article_sq: raw.article_sq,
    article_so: raw.article_so,
    article_sn: raw.article_sn,
    article_sm: raw.article_sm,
    article_sl: raw.article_sl,
    article_sk: raw.article_sk,
    article_si: raw.article_si,
    article_sd: raw.article_sd,
    article_ru: raw.article_ru,
    article_ro: raw.article_ro,
    article_pt: raw.article_pt,
    article_ps: raw.article_ps,
    article_pl: raw.article_pl,
    article_pa: raw.article_pa,
    article_ny: raw.article_ny,
    article_no: raw.article_no,
    article_nl: raw.article_nl,
    article_ne: raw.article_ne,
    article_my: raw.article_my,
    article_mt: raw.article_mt,
    article_ms: raw.article_ms,
    article_mr: raw.article_mr,
    article_mn: raw.article_mn,
    article_ml: raw.article_ml,
    article_mk: raw.article_mk,
    article_mi: raw.article_mi,
    article_mg: raw.article_mg,
    article_lv: raw.article_lv,
    article_lt: raw.article_lt,
    article_lo: raw.article_lo,
    article_lb: raw.article_lb,
    article_la: raw.article_la,
    article_ky: raw.article_ky,
    article_ku: raw.article_ku,
    article_ko: raw.article_ko,
    article_kn: raw.article_kn,
    article_km: raw.article_km,
    article_kk: raw.article_kk,
    article_ka: raw.article_ka,
    article_jw: raw.article_jw,
    article_ja: raw.article_ja,
    article_iw: raw.article_iw,
    article_it: raw.article_it,
    article_is: raw.article_is,
    article_ig: raw.article_ig,
    article_id: raw.article_id,
    article_hy: raw.article_hy,
    article_hu: raw.article_hu,
    article_ht: raw.article_ht,
    article_hr: raw.article_hr,
    article_hmn: raw.article_hmn,
    article_hi: raw.article_hi,
    article_haw: raw.article_haw,
    article_ha: raw.article_ha,
    article_gu: raw.article_gu,
    article_gl: raw.article_gl,
    article_gd: raw.article_gd,
    article_ga: raw.article_ga,
    article_fy: raw.article_fy,
    article_fr: raw.article_fr,
    article_fi: raw.article_fi,
    article_fa: raw.article_fa,
    article_eu: raw.article_eu,
    article_et: raw.article_et,
    article_es: raw.article_es,
    article_eo: raw.article_eo,
    article_en: raw.article_en,
    article_el: raw.article_el,
    article_de: raw.article_de,
    article_da: raw.article_da,
    article_cy: raw.article_cy,
    article_cs: raw.article_cs,
    article_co: raw.article_co,
    article_ceb: raw.article_ceb,
    article_ca: raw.article_ca,
    article_bs: raw.article_bs,
    article_bn: raw.article_bn,
    article_bg: raw.article_bg,
    article_be: raw.article_be,
    article_az: raw.article_az,
    article_ar: raw.article_ar,
    article_am: raw.article_am,
    article_af: raw.article_af,
    article: raw.article,
    is_files_zu: raw.is_files_zu,
    is_files_zh: raw.is_files_zh,
    is_files_yo: raw.is_files_yo,
    is_files_yi: raw.is_files_yi,
    is_files_xh: raw.is_files_xh,
    is_files_vi: raw.is_files_vi,
    is_files_uz: raw.is_files_uz,
    is_files_ur: raw.is_files_ur,
    is_files_uk: raw.is_files_uk,
    is_files_tr: raw.is_files_tr,
    is_files_tl: raw.is_files_tl,
    is_files_th: raw.is_files_th,
    is_files_tg: raw.is_files_tg,
    is_files_te: raw.is_files_te,
    is_files_ta: raw.is_files_ta,
    is_files_sw: raw.is_files_sw,
    is_files_sv: raw.is_files_sv,
    is_files_su: raw.is_files_su,
    is_files_st: raw.is_files_st,
    is_files_sr: raw.is_files_sr,
    is_files_sq: raw.is_files_sq,
    is_files_so: raw.is_files_so,
    is_files_sn: raw.is_files_sn,
    is_files_sm: raw.is_files_sm,
    is_files_sl: raw.is_files_sl,
    is_files_sk: raw.is_files_sk,
    is_files_si: raw.is_files_si,
    is_files_sd: raw.is_files_sd,
    is_files_ru: raw.is_files_ru,
    is_files_ro: raw.is_files_ro,
    is_files_pt: raw.is_files_pt,
    is_files_ps: raw.is_files_ps,
    is_files_pl: raw.is_files_pl,
    is_files_pa: raw.is_files_pa,
    is_files_ny: raw.is_files_ny,
    is_files_no: raw.is_files_no,
    is_files_nl: raw.is_files_nl,
    is_files_ne: raw.is_files_ne,
    is_files_my: raw.is_files_my,
    is_files_mt: raw.is_files_mt,
    is_files_ms: raw.is_files_ms,
    is_files_mr: raw.is_files_mr,
    is_files_mn: raw.is_files_mn,
    is_files_ml: raw.is_files_ml,
    is_files_mk: raw.is_files_mk,
    is_files_mi: raw.is_files_mi,
    is_files_mg: raw.is_files_mg,
    is_files_lv: raw.is_files_lv,
    is_files_lt: raw.is_files_lt,
    is_files_lo: raw.is_files_lo,
    is_files_lb: raw.is_files_lb,
    is_files_la: raw.is_files_la,
    is_files_ky: raw.is_files_ky,
    is_files_ku: raw.is_files_ku,
    is_files_ko: raw.is_files_ko,
    is_files_kn: raw.is_files_kn,
    is_files_km: raw.is_files_km,
    is_files_kk: raw.is_files_kk,
    is_files_ka: raw.is_files_ka,
    is_files_jw: raw.is_files_jw,
    is_files_ja: raw.is_files_ja,
    is_files_iw: raw.is_files_iw,
    is_files_it: raw.is_files_it,
    is_files_is: raw.is_files_is,
    is_files_ig: raw.is_files_ig,
    is_files_id: raw.is_files_id,
    is_files_hy: raw.is_files_hy,
    is_files_hu: raw.is_files_hu,
    is_files_ht: raw.is_files_ht,
    is_files_hr: raw.is_files_hr,
    is_files_hmn: raw.is_files_hmn,
    is_files_hi: raw.is_files_hi,
    is_files_haw: raw.is_files_haw,
    is_files_ha: raw.is_files_ha,
    is_files_gu: raw.is_files_gu,
    is_files_gl: raw.is_files_gl,
    is_files_gd: raw.is_files_gd,
    is_files_ga: raw.is_files_ga,
    is_files_fy: raw.is_files_fy,
    is_files_fr: raw.is_files_fr,
    is_files_fi: raw.is_files_fi,
    is_files_fa: raw.is_files_fa,
    is_files_eu: raw.is_files_eu,
    is_files_et: raw.is_files_et,
    is_files_es: raw.is_files_es,
    is_files_eo: raw.is_files_eo,
    is_files_en: raw.is_files_en,
    is_files_el: raw.is_files_el,
    is_files_de: raw.is_files_de,
    is_files_da: raw.is_files_da,
    is_files_cy: raw.is_files_cy,
    is_files_cs: raw.is_files_cs,
    is_files_co: raw.is_files_co,
    is_files_ceb: raw.is_files_ceb,
    is_files_ca: raw.is_files_ca,
    is_files_bs: raw.is_files_bs,
    is_files_bn: raw.is_files_bn,
    is_files_bg: raw.is_files_bg,
    is_files_be: raw.is_files_be,
    is_files_az: raw.is_files_az,
    is_files_ar: raw.is_files_ar,
    is_files_am: raw.is_files_am,
    is_files_af: raw.is_files_af,
    is_files: raw.is_files,
    lang: raw.lang,
    url: raw.url,
    topic: raw.topic,
    color: raw.color,
    views: raw.views,
    author: author,
    site_name: raw.site_name,
    files: files,
    comment_zu: raw.comment_zu,
    comment_zh: raw.comment_zh,
    comment_yo: raw.comment_yo,
    comment_yi: raw.comment_yi,
    comment_xh: raw.comment_xh,
    comment_vi: raw.comment_vi,
    comment_uz: raw.comment_uz,
    comment_ur: raw.comment_ur,
    comment_uk: raw.comment_uk,
    comment_tr: raw.comment_tr,
    comment_tl: raw.comment_tl,
    comment_th: raw.comment_th,
    comment_tg: raw.comment_tg,
    comment_te: raw.comment_te,
    comment_ta: raw.comment_ta,
    comment_sw: raw.comment_sw,
    comment_sv: raw.comment_sv,
    comment_su: raw.comment_su,
    comment_st: raw.comment_st,
    comment_sr: raw.comment_sr,
    comment_sq: raw.comment_sq,
    comment_so: raw.comment_so,
    comment_sn: raw.comment_sn,
    comment_sm: raw.comment_sm,
    comment_sl: raw.comment_sl,
    comment_sk: raw.comment_sk,
    comment_si: raw.comment_si,
    comment_sd: raw.comment_sd,
    comment_ru: raw.comment_ru,
    comment_ro: raw.comment_ro,
    comment_pt: raw.comment_pt,
    comment_ps: raw.comment_ps,
    comment_pl: raw.comment_pl,
    comment_pa: raw.comment_pa,
    comment_ny: raw.comment_ny,
    comment_no: raw.comment_no,
    comment_nl: raw.comment_nl,
    comment_ne: raw.comment_ne,
    comment_my: raw.comment_my,
    comment_mt: raw.comment_mt,
    comment_ms: raw.comment_ms,
    comment_mr: raw.comment_mr,
    comment_mn: raw.comment_mn,
    comment_ml: raw.comment_ml,
    comment_mk: raw.comment_mk,
    comment_mi: raw.comment_mi,
    comment_mg: raw.comment_mg,
    comment_lv: raw.comment_lv,
    comment_lt: raw.comment_lt,
    comment_lo: raw.comment_lo,
    comment_lb: raw.comment_lb,
    comment_la: raw.comment_la,
    comment_ky: raw.comment_ky,
    comment_ku: raw.comment_ku,
    comment_ko: raw.comment_ko,
    comment_kn: raw.comment_kn,
    comment_km: raw.comment_km,
    comment_kk: raw.comment_kk,
    comment_ka: raw.comment_ka,
    comment_jw: raw.comment_jw,
    comment_ja: raw.comment_ja,
    comment_iw: raw.comment_iw,
    comment_it: raw.comment_it,
    comment_is: raw.comment_is,
    comment_ig: raw.comment_ig,
    comment_id: raw.comment_id,
    comment_hy: raw.comment_hy,
    comment_hu: raw.comment_hu,
    comment_ht: raw.comment_ht,
    comment_hr: raw.comment_hr,
    comment_hmn: raw.comment_hmn,
    comment_hi: raw.comment_hi,
    comment_haw: raw.comment_haw,
    comment_ha: raw.comment_ha,
    comment_gu: raw.comment_gu,
    comment_gl: raw.comment_gl,
    comment_gd: raw.comment_gd,
    comment_ga: raw.comment_ga,
    comment_fy: raw.comment_fy,
    comment_fr: raw.comment_fr,
    comment_fi: raw.comment_fi,
    comment_fa: raw.comment_fa,
    comment_eu: raw.comment_eu,
    comment_et: raw.comment_et,
    comment_es: raw.comment_es,
    comment_eo: raw.comment_eo,
    comment_en: raw.comment_en,
    comment_el: raw.comment_el,
    comment_de: raw.comment_de,
    comment_da: raw.comment_da,
    comment_cy: raw.comment_cy,
    comment_cs: raw.comment_cs,
    comment_co: raw.comment_co,
    comment_ceb: raw.comment_ceb,
    comment_ca: raw.comment_ca,
    comment_bs: raw.comment_bs,
    comment_bn: raw.comment_bn,
    comment_bg: raw.comment_bg,
    comment_be: raw.comment_be,
    comment_az: raw.comment_az,
    comment_ar: raw.comment_ar,
    comment_am: raw.comment_am,
    comment_af: raw.comment_af,
    comment: raw.comment,
    description_zu: raw.description_zu,
    description_zh: raw.description_zh,
    description_yo: raw.description_yo,
    description_yi: raw.description_yi,
    description_xh: raw.description_xh,
    description_vi: raw.description_vi,
    description_uz: raw.description_uz,
    description_ur: raw.description_ur,
    description_uk: raw.description_uk,
    description_tr: raw.description_tr,
    description_tl: raw.description_tl,
    description_th: raw.description_th,
    description_tg: raw.description_tg,
    description_te: raw.description_te,
    description_ta: raw.description_ta,
    description_sw: raw.description_sw,
    description_sv: raw.description_sv,
    description_su: raw.description_su,
    description_st: raw.description_st,
    description_sr: raw.description_sr,
    description_sq: raw.description_sq,
    description_so: raw.description_so,
    description_sn: raw.description_sn,
    description_sm: raw.description_sm,
    description_sl: raw.description_sl,
    description_sk: raw.description_sk,
    description_si: raw.description_si,
    description_sd: raw.description_sd,
    description_ru: raw.description_ru,
    description_ro: raw.description_ro,
    description_pt: raw.description_pt,
    description_ps: raw.description_ps,
    description_pl: raw.description_pl,
    description_pa: raw.description_pa,
    description_ny: raw.description_ny,
    description_no: raw.description_no,
    description_nl: raw.description_nl,
    description_ne: raw.description_ne,
    description_my: raw.description_my,
    description_mt: raw.description_mt,
    description_ms: raw.description_ms,
    description_mr: raw.description_mr,
    description_mn: raw.description_mn,
    description_ml: raw.description_ml,
    description_mk: raw.description_mk,
    description_mi: raw.description_mi,
    description_mg: raw.description_mg,
    description_lv: raw.description_lv,
    description_lt: raw.description_lt,
    description_lo: raw.description_lo,
    description_lb: raw.description_lb,
    description_la: raw.description_la,
    description_ky: raw.description_ky,
    description_ku: raw.description_ku,
    description_ko: raw.description_ko,
    description_kn: raw.description_kn,
    description_km: raw.description_km,
    description_kk: raw.description_kk,
    description_ka: raw.description_ka,
    description_jw: raw.description_jw,
    description_ja: raw.description_ja,
    description_iw: raw.description_iw,
    description_it: raw.description_it,
    description_is: raw.description_is,
    description_ig: raw.description_ig,
    description_id: raw.description_id,
    description_hy: raw.description_hy,
    description_hu: raw.description_hu,
    description_ht: raw.description_ht,
    description_hr: raw.description_hr,
    description_hmn: raw.decription_hmn,
    description_hi: raw.description_hi,
    description_haw: raw.description_haw,
    description_ha: raw.description_ha,
    description_gu: raw.description_gu,
    description_gl: raw.description_gl,
    description_gd: raw.description_gd,
    description_ga: raw.description_ga,
    description_fy: raw.description_fy,
    description_fr: raw.description_fr,
    description_fi: raw.description_fi,
    description_fa: raw.description_fa,
    description_eu: raw.description_eu,
    description_et: raw.description_et,
    description_es: raw.description_es,
    description_eo: raw.description_eo,
    description_en: raw.description_en,
    description_el: raw.description_el,
    description_de: raw.description_de,
    description_da: raw.description_da,
    description_cy: raw.description_cy,
    description_cs: raw.description_cs,
    description_co: raw.description_co,
    description_ceb: raw.description_ceb,
    description_ca: raw.description_ca,
    description_bs: raw.description_bs,
    description_bn: raw.description_bn,
    description_bg: raw.description_bg,
    description_be: raw.description_be,
    description_az: raw.description_az,
    description_ar: raw.description_ar,
    description_am: raw.description_am,
    description_af: raw.description_af,
    description: raw.description,
    title_zu: raw.title_zu,
    title_zh: raw.title_zh,
    title_yo: raw.title_yo,
    title_yi: raw.title_yi,
    title_xh: raw.title_xh,
    title_vi: raw.title_vi,
    title_uz: raw.title_uz,
    title_ur: raw.title_ur,
    title_uk: raw.title_uk,
    title_tr: raw.title_tr,
    title_tl: raw.title_tl,
    title_th: raw.title_th,
    title_tg: raw.title_tg,
    title_te: raw.title_te,
    title_ta: raw.title_ta,
    title_sw: raw.title_sw,
    title_sv: raw.title_sv,
    title_su: raw.title_su,
    title_st: raw.title_st,
    title_sr: raw.title_sr,
    title_sq: raw.title_sq,
    title_so: raw.title_so,
    title_sn: raw.title_sn,
    title_sm: raw.title_sm,
    title_sl: raw.title_sl,
    title_sk: raw.title_sk,
    title_si: raw.title_si,
    title_sd: raw.title_sd,
    title_ru: raw.title_ru,
    title_ro: raw.title_ro,
    title_pt: raw.title_pt,
    title_ps: raw.title_ps,
    title_pl: raw.title_pl,
    title_pa: raw.title_pa,
    title_ny: raw.title_ny,
    title_no: raw.title_no,
    title_nl: raw.title_nl,
    title_ne: raw.title_ne,
    title_my: raw.title_my,
    title_mt: raw.title_mt,
    title_ms: raw.title_ms,
    title_mr: raw.title_mr,
    title_mn: raw.title_mn,
    title_ml: raw.title_ml,
    title_mk: raw.title_mk,
    title_mi: raw.title_mi,
    title_mg: raw.title_mg,
    title_lv: raw.title_lv,
    title_lt: raw.title_lt,
    title_lo: raw.title_lo,
    title_lb: raw.title_lb,
    title_la: raw.title_la,
    title_ky: raw.title_ky,
    title_ku: raw.title_ku,
    title_ko: raw.title_ko,
    title_kn: raw.title_kn,
    title_km: raw.title_km,
    title_kk: raw.title_kk,
    title_ka: raw.title_ka,
    title_jw: raw.title_jw,
    title_ja: raw.title_ja,
    title_iw: raw.title_iw,
    title_it: raw.title_it,
    title_is: raw.title_is,
    title_ig: raw.title_ig,
    title_id: raw.title_id,
    title_hy: raw.title_hy,
    title_hu: raw.title_hu,
    title_ht: raw.title_ht,
    title_hr: raw.title_hr,
    title_hmn: raw.title_hmn,
    title_hi: raw.title_hi,
    title_haw: raw.title_haw,
    title_ha: raw.title_ha,
    title_gu: raw.title_gu,
    title_gl: raw.title_gl,
    title_gd: raw.title_gd,
    title_ga: raw.title_ga,
    title_fy: raw.title_fy,
    title_fr: raw.title_fr,
    title_fi: raw.title_fi,
    title_fa: raw.title_fa,
    title_eu: raw.title_eu,
    title_et: raw.title_et,
    title_es: raw.title_es,
    title_eo: raw.title_eo,
    title_en: raw.title_en,
    title_el: raw.title_el,
    title_de: raw.title_de,
    title_da: raw.title_da,
    title_cy: raw.title_cy,
    title_cs: raw.title_cs,
    title_co: raw.title_co,
    title_ceb: raw.title_ceb,
    title_ca: raw.title_ca,
    title_bs: raw.title_bs,
    title_bn: raw.title_bn,
    title_bg: raw.title_bg,
    title_be: raw.title_be,
    title_az: raw.title_az,
    title_ar: raw.title_ar,
    title_am: raw.title_am,
    title_af: raw.title_af,
    title: raw.title,
    id: raw.id,
    is_favourite: raw.is_favourite,
    allow_iframe: raw.allow_iframe,
  }
}

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async login(user: UserSnapshot): Promise<Types.GetLoginResult> {
    this.apisauce.setHeader("Content-Type", "application/json")
    const response: ApiResponse<any> = await this.apisauce.get(
      `/auth/login/${user.login}/${user.password}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultLogin: LoginSnapshot = {
        data: response.data.data,
      }
      return { kind: "ok", login: resultLogin }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async register(user: UserSnapshot): Promise<Types.GetRegisterResult> {
    this.apisauce.setHeader("Content-Type", "application/json")
    const response: ApiResponse<any> = await this.apisauce.post(
      `/auth/register?login=${user.login}&password=${user.password}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultRegister: LoginSnapshot = {
        data: response.data._id,
      }
      return { kind: "ok", register: resultRegister }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getSettings(): Promise<Types.GetSettingsResult> {
    const response: ApiResponse<any> = await this.apisauce.get("/settings.txt")

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const settings: number = response.data
      return { kind: "ok", settings: settings }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getMessages(offset: number = 0, language: string = "en"): Promise<Types.GetMessagesResult> {
    const response: ApiResponse<any> = await this.apisauce.get("/messages", {
      offset,
      lang: language,
    })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const messages = response.data.data
      const convertedMessages: MessageSnapshot[] = messages.map(convertMessage)
      return { kind: "ok", messages: convertedMessages }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getFavourites(offset: number = 0): Promise<Types.GetMessagesResult> {
    const response: ApiResponse<any> = await this.apisauce.get("/messages/favourites", { offset })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const messages = response.data.data
      const convertedMessages: MessageSnapshot[] = messages.map(convertMessage)
      return { kind: "ok", messages: convertedMessages }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getUser(): Promise<Types.GetUserResult> {
    const response: ApiResponse<any> = await this.apisauce.get("/auth/user")

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", role: response.data.data.role }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async sendMessage(
    messageRequest: MessageRequestSnapshot,
  ): Promise<Types.GetMessageRequestResult> {
    this.apisauce.setHeader("Content-Type", "application/json")
    const response: ApiResponse<any> = await this.apisauce.post("/messages", messageRequest)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok" }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async uploadFile(file: ImagePickerResponse): Promise<Types.GetUploadResult> {
    const data: FormData = new FormData()
    data.append("file", {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    })
    this.apisauce.setHeader("Content-Type", "multipart/form-data")
    const response: ApiResponse<any> = await this.apisauce.post("/upload", data)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const uploadResponse = response.data.data
      return { kind: "ok", response: uploadResponse }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async deleteMessage(id: string): Promise<Types.GetMessageRequestResult> {
    const response: ApiResponse<any> = await this.apisauce.delete(`/messages/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok" }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async favouriteMessage(id: string): Promise<Types.GetMessageRequestResult> {
    const response: ApiResponse<any> = await this.apisauce.post(`/messages/${id}/favourite`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok" }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a list of users.
   */
  /*   async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  } */

  /**
   * Gets a single user by ID
   */

  /*   async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  } */
}
