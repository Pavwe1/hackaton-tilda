# Гайд как развернуть

1) Скачать nodeJS
2) делаем npm i --global yarn
3) Делаем npm run dev
4) гоутоуво

Тестовый пользователь:
test:123456

Так как миграции на бэке не успели сделать(сори), нужно еще сделать в контейнере с postgres вот это(на password_hash не обращайте внимание, если создавать пользователя через POST запрос, то он форматирует норм пароль в этот хэш):
```
INSERT INTO users (name, username, password_hash) VALUES ('test1', 'test1', '$2a$10$GYEvx/xw4PSycRMQWf3VMeQRP6GpTDN8PAuDpTv6wSK6oGS9PA876');
```

И вот это:
```
INSERT INTO tags (id, name, created_at, updated_at, deleted_at) VALUES
  (gen_random_uuid(), 'Hero', now(), now(), NULL),
  (gen_random_uuid(), 'Features', now(), now(), NULL),
  (gen_random_uuid(), 'CTA', now(), now(), NULL),
  (gen_random_uuid(), 'Testimonial', now(), now(), NULL),
  (gen_random_uuid(), 'Footer', now(), now(), NULL)
RETURNING id, name;  -- возвращает сгенерированные UUID, чтобы подставить в блоки

INSERT INTO block_types (
  id, tag_id, name, description, template, schema, preview, created_at, updated_at, deleted_at
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM tags WHERE name='Hero'),
  'Hero Banner (Large)',
  'Большой хедер с заголовком, подзаголовком и кнопкой CTA. Inline-стили в container, заголовке и кнопке.',
  $$<section style="width:100%;box-sizing:border-box;padding:60px 20px;background-image:url('https://via.placeholder.com/1400x400');background-size:cover;background-position:center;color:#ffffff;text-align:center;">
    <div style="max-width:1100px;margin:0 auto;background:rgba(0,0,0,0.35);padding:30px;border-radius:8px;">
      <h1 style="margin:0;font-size:40px;line-height:1.05;font-weight:700;">Заголовок, который цепляет</h1>
      <p style="margin:16px 0 24px;font-size:18px;opacity:0.95;">Короткое мощное описание — объясняет, почему это важно.</p>
      <a href="#" style="display:inline-block;padding:12px 22px;background:#ff7a59;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;">Начать сейчас</a>
    </div>
  </section>$$,
  '{
    "title": { "type": "string", "label":"Заголовок", "default":"Заголовок, который цепляет" },
    "subtitle": { "type": "string", "label":"Подзаголовок", "default":"Короткое мощное описание" },
    "cta_text": { "type": "string", "label":"Текст кнопки", "default":"Начать сейчас" },
    "background_image": { "type": "string", "label":"URL фонового изображения", "default":"https://via.placeholder.com/1400x400" }
  }'::jsonb,
  '<div style="padding:12px;font-weight:700;">Hero: Заголовок + CTA</div>',
  now(), now(), NULL
);
INSERT INTO block_types (id, tag_id, name, description, template, schema, preview, created_at, updated_at, deleted_at)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM tags WHERE name='Features'),
  'Feature Grid (3)',
  'Сетка из трёх фич: иконка, заголовок, описание. Подходит для преимуществ продукта.',
  $$<section style="padding:40px 16px;background:#ffffff;color:#222;">
    <div style="max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:18px;justify-content:space-between;">
      <div style="flex:1 1 30%;min-width:240px;padding:20px;border-radius:8px;border:1px solid #eee;text-align:left;">
        <div style="font-size:36px;margin-bottom:8px;">🔥</div>
        <h3 style="margin:0 0 8px;font-size:18px;">Быстро</h3>
        <p style="margin:0;font-size:14px;opacity:0.8;">Описание преимущества — почему это быстро и удобно.</p>
      </div>
      <div style="flex:1 1 30%;min-width:240px;padding:20px;border-radius:8px;border:1px solid #eee;text-align:left;">
        <div style="font-size:36px;margin-bottom:8px;">🔒</div>
        <h3 style="margin:0 0 8px;font-size:18px;">Надёжно</h3>
        <p style="margin:0;font-size:14px;opacity:0.8;">Короткое описание по безопасности или стабилизации.</p>
      </div>
      <div style="flex:1 1 30%;min-width:240px;padding:20px;border-radius:8px;border:1px solid #eee;text-align:left;">
        <div style="font-size:36px;margin-bottom:8px;">⚙️</div>
        <h3 style="margin:0 0 8px;font-size:18px;">Гибко</h3>
        <p style="margin:0;font-size:14px;opacity:0.8;">Описание гибкости и возможностей настройки.</p>
      </div>
    </div>
  </section>$$,
  '{
    "items": { "type":"array", "label":"Фичи", "items": {
      "icon":{"type":"string","label":"Иконка (emoji или HTML)","default":"🔥"},
      "title":{"type":"string","label":"Заголовок","default":"Быстро"},
      "text":{"type":"string","label":"Текст","default":"Описание преимущества"}
    }}
  }'::jsonb,
  '<div style="padding:8px;font-size:14px;">Features: 3 items</div>',
  now(), now(), NULL
);

INSERT INTO block_types (id, tag_id, name, description, template, schema, preview, created_at, updated_at, deleted_at)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM tags WHERE name='CTA'),
  'CTA Card (Centered)',
  'Карточка-призыв с коротким текстом, подзаголовком и двумя кнопками (primary/secondary).',
  $$<section style="padding:36px 16px;background:#f7f9fc;text-align:center;">
    <div style="display:inline-block;max-width:720px;padding:28px;border-radius:12px;background:#fff;box-shadow:0 6px 18px rgba(20,30,60,0.06);">
      <h2 style="margin:0 0 10px;font-size:22px;">Готовы увеличить конверсию?</h2>
      <p style="margin:0 0 20px;color:#666;">Короткое предложение, которое объясняет ценность и стимул к действию.</p>
      <div style="display:flex;gap:12px;justify-content:center">
        <a href="#" style="padding:10px 18px;border-radius:8px;background:#0066ff;color:#fff;text-decoration:none;font-weight:600;">Попробовать</a>
        <a href="#" style="padding:10px 18px;border-radius:8px;border:1px solid #cfe0ff;color:#0066ff;text-decoration:none;">Узнать подробнее</a>
      </div>
    </div>
  </section>$$,
  '{
    "headline":{"type":"string","label":"Заголовок","default":"Готовы увеличить конверсию?"},
    "subtext":{"type":"string","label":"Подзаголовок","default":"Короткое предложение, которое объясняет ценность."},
    "primary_cta":{"type":"string","label":"Текст основной кнопки","default":"Попробовать"},
    "secondary_cta":{"type":"string","label":"Текст второй кнопки","default":"Узнать подробнее"}
  }'::jsonb,
  '<div style="padding:10px;">CTA: Попробовать / Узнать подробнее</div>',
  now(), now(), NULL
);

INSERT INTO block_types (id, tag_id, name, description, template, schema, preview, created_at, updated_at, deleted_at)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM tags WHERE name='Testimonial'),
  'Testimonial / Quote',
  'Блок отзыва: цитата, имя автора, роль и аватар в круге (initials).',
  $$<section style="padding:32px 16px;background:#fff;">
    <div style="max-width:760px;margin:0 auto;border-left:4px solid #ffd54f;padding:18px 22px;background:#fff;border-radius:6px;">
      <p style="margin:0 0 14px;font-size:18px;line-height:1.4;color:#222;">"Это лучший инструмент, который мы когда-либо использовали. Экономит время и повышает качество."</p>
      <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
        <div style="width:48px;height:48px;border-radius:50%;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-weight:700;">AB</div>
        <div>
          <div style="font-weight:700;font-size:14px;">Алексей Б.</div>
          <div style="font-size:12px;color:#777;">CTO, ExampleCorp</div>
        </div>
      </div>
    </div>
  </section>$$,
  '{
    "quote":{"type":"string","label":"Цитата","default":"Это лучший инструмент..."},
    "author":{"type":"string","label":"Автор","default":"Алексей Б."},
    "role":{"type":"string","label":"Роль/Компания","default":"CTO, ExampleCorp"},
    "avatar_text":{"type":"string","label":"Initials","default":"AB"}
  }'::jsonb,
  '<div style="padding:8px;">Testimonial: "Это лучший инструмент..." — Алексей Б.</div>',
  now(), now(), NULL
);
INSERT INTO block_types (id, tag_id, name, description, template, schema, preview, created_at, updated_at, deleted_at)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM tags WHERE name='Footer'),
  'Footer (Simple)',
  'Простой футер с колонками: контакт, ссылки и авторские права. Подходит как завершающий блок.',
  $$<footer style="padding:28px 16px;background:#0b1220;color:#cfd8ea;">
    <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;gap:18px;justify-content:space-between;">
      <div style="min-width:180px;">
        <div style="font-weight:700;margin-bottom:8px;">Компания</div>
        <div style="font-size:14px;opacity:0.9;">Короткое описание компании или слоган.</div>
      </div>
      <div style="min-width:160px;">
        <div style="font-weight:700;margin-bottom:8px;">Ссылки</div>
        <div style="font-size:14px;opacity:0.9;">
          <div><a href="#" style="color:inherit;text-decoration:none;">О нас</a></div>
          <div><a href="#" style="color:inherit;text-decoration:none;">Контакты</a></div>
          <div><a href="#" style="color:inherit;text-decoration:none;">Политика конфиденциальности</a></div>
        </div>
      </div>
      <div style="min-width:160px;">
        <div style="font-weight:700;margin-bottom:8px;">Контакт</div>
        <div style="font-size:14px;opacity:0.9;">
          <div>email@example.com</div>
          <div>+7 (900) 000-00-00</div>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:18px;font-size:13px;opacity:0.75;">© 2025 Example — Все права защищены</div>
  </footer>$$,
  '{
    "company_name":{"type":"string","label":"Имя компании","default":"Example"},
    "links":{"type":"array","label":"Ссылки","items":{"text":{"type":"string"},"url":{"type":"string"}}}
  }'::jsonb,
  '<div style="padding:8px;">Footer: © 2025 Example</div>',
  now(), now(), NULL
);
```