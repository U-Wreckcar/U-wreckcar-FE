"use client"
import React, { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
/**
 * Style, Image
 */
import styles from "./CreateUTM.module.css"
import plus from "assets/plus.png"
import minus from "assets/minus.png"
import Image from "next/image"
import { CreateCategory } from "./CreateCategory"
import { postUTMs } from "@/util/async/api"
import { Alert } from "@/shared/button/Alert"
import { ErrorAlert } from "@/shared/button/ErrorAlert"
import { getCookie } from "@/util/async/Cookie"
import { redirect } from "next/navigation"
import b_close from "assets/b_close.png"
type UTMsType = {
  utms: {
    utm_url?: string
    utm_campaign_id?: string
    utm_source?: string
    utm_medium?: string
    utm_campaign_name?: string | null
    utm_content?: string | null
    utm_term?: string | null
    utm_memo?: string | null
  }[]
}
type PropsType = {
  setResUTM: any
  resUTM: any
}
export const CreateUTM: React.FC<PropsType> = ({ setResUTM, resUTM }) => {
  const [memoText, setMemoText] = useState("")
  const [alert, setAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const [sataus, setStatus] = useState()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UTMsType>({
    defaultValues: {
      utms: [
        {
          utm_url: "",
          utm_campaign_id: "",
          utm_source: "",
          utm_medium: "",
          utm_campaign_name: null,
          utm_term: null,
          utm_content: null,
          utm_memo: null,
        },
      ],
    },
    mode: "onBlur",
  })
  const { fields, append, remove } = useFieldArray({
    name: "utms",
    control,
  })
  // const requeirFn = (e: any) => {
  //   e.target.value = e.target.value.replace(/[^a-z0-9./:_-]?/, '');
  //   e.target.value = e.target.value.replace({ maxLength: 70 }, '');
  // };

  const addList = () => {
    if (fields.length <= 4) {
      append({
        utm_url: "",
        utm_campaign_id: "",
        utm_source: "",
        utm_medium: "",
        utm_campaign_name: "",
        utm_content: "",
        utm_term: "",
        utm_memo: "",
      })
    }
  }
  const memoHandler = (e: any) => {
    const textareaValue = e.target?.value
    console.log(e.target)
    setMemoText(textareaValue)
  }

  const onSubmit = async (data: UTMsType) => {
    try {
      const res = await postUTMs(data)
      console.log(res)
      console.log(res.data)
      setResUTM(res.data)
      if (res.data !== "") {
        setAlert(true)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {}, [memoText])
  console.log(errors)
  /**s
   * 로그인 하지 않은 유저 로그인 페이지로 보내기
   */
  useEffect(() => {
    const cookie = getCookie("access_token")

    if (!cookie) {
      redirect("/login")
    }
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.scroll_input}>
          <CreateCategory />
          <div className={styles.create_container}>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <div key={field.id}>
                    <div className={styles.item_box}>
                      <div className={styles.number}>{index + 1}</div>

                      <input
                        placeholder='https://를 붙여서 입력해 주세요.'
                        // onInput={requeirFn}
                        type='url'
                        // pattern='https://.*'
                        {...register(`utms.${index}.utm_url` as const, {
                          required: true,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_url
                            ? console.log("no value")
                            : ""
                        }, ${styles.input_style}`}
                      />
                      {errors?.utms?.[index]?.utm_url ? (
                        <p className={styles.red_text}>!</p>
                      ) : (
                        ""
                      )}

                      <input
                        // placeholder="utm_source"
                        // onInput={requeirFn}
                        {...register(`utms.${index}.utm_source` as const, {
                          required: true,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_source ? "error" : ""
                        }, ${styles.input_style}`}
                      />
                      {errors?.utms?.[index]?.utm_source ? (
                        <p className={styles.red_text}>!</p>
                      ) : (
                        ""
                      )}
                      <input
                        // onInput={requeirFn}
                        // placeholder="utm_medium"
                        {...register(`utms.${index}.utm_medium` as const, {
                          required: true,
                          // pattern: /[a-z]/i,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_medium ? "error" : ""
                        }, ${styles.input_style}`}
                      />
                      {errors?.utms?.[index]?.utm_medium ? (
                        <p className={styles.red_text}>!</p>
                      ) : (
                        ""
                      )}
                      <input
                        // onInput={requeirFn}
                        // placeholder="utm_campaign_name"
                        {...register(
                          `utms.${index}.utm_campaign_name` as const,
                          { required: true }
                        )}
                        className={`${
                          errors?.utms?.[index]?.utm_campaign_name
                            ? "error"
                            : ""
                        }, ${styles.input_style}`}
                      />
                      {errors?.utms?.[index]?.utm_campaign_name ? (
                        <p className={styles.red_text}>!</p>
                      ) : (
                        ""
                      )}
                      <input
                        // placeholder="utm_campaign_id"
                        // onInput={requeirFn}
                        {...register(`utms.${index}.utm_campaign_id` as const, {
                          // pattern: /[a-z]/i,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_campaign_id ? "error" : ""
                        }, ${styles.input_style}`}
                      />
                      <input
                        // onInput={requeirFn}
                        // placeholder="utm_term"
                        {...register(`utms.${index}.utm_term` as const, {})}
                        className={`${
                          errors?.utms?.[index]?.utm_term ? "error" : ""
                        }, ${styles.input_style}`}
                      />
                      {errors?.utms?.[index]?.utm_term ? (
                        <p className={styles.red_text}>!</p>
                      ) : (
                        ""
                      )}
                      <input
                        // onInput={requeirFn}
                        // placeholder="utm_campaign_content"
                        {...register(`utms.${index}.utm_content` as const)}
                        className={`${
                          errors?.utms?.[index]?.utm_content ? "error" : ""
                        }, ${styles.input_style}`}
                      />
                      {errors?.utms?.[index]?.utm_content ? (
                        <p className={styles.red_text}>!</p>
                      ) : (
                        ""
                      )}
                      <textarea
                        className={`${styles.active}`}
                        {...register(`utms.${index}.utm_memo` as const, {
                          maxLength: 80,
                        })}
                        spellCheck={false}
                      />
                      <div className={styles.minus_button}>
                        <button
                          className={styles.minus_button_style}
                          type='button'
                          onClick={() => {
                            if (index >= 1) {
                              remove(index)
                            }
                          }}>
                          <Image
                            className={styles.minus_img}
                            src={minus}
                            alt='리스트 삭제'
                            onError={() => {
                              console.log(
                                "리스트 빼기 이미지를 불러올 수 없습니다."
                              )
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.create_button_box}>
          <button
            className={styles.add_list_button}
            type='button'
            onClick={addList}>
            <Image
              className={styles.plus_button_img}
              src={plus}
              alt='추가하기'
              onError={() => {
                console.log("추가버튼 이미지를 불러오지 못했습니다.")
              }}
            />
          </button>
          {alert && (
            <Alert
              title={"성공"}
              contents={"UTM 생성을 성공하셨습니다!"}
              onClickEvent={setAlert}
            />
          )}

          <input
            id='create_btn'
            className={styles.create_button}
            type='submit'
            value='생성하기'
            // onClick={() => {
            //   setAlert(true);
            // }}
          />
        </div>

        {/* <FirstNameWatched control={control} /> */}
      </form>
    </div>
  )
}
// interface FormInputs {
//   firstName: string;
// }
// function FirstNameWatched({ control }: { control: Control<FormInputs> }) {
//   const firstName = useWatch({
//     control,
//     name: 'firstName', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
//     defaultValue: 'default', // default value before the render
//   });
//   return <p>Watch: {firstName}</p>; // only re-render at the component level, when firstName changes
// }
